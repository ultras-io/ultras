import type { IDeleteStateData } from '../types/crud/delete';
import type {
  RootStoreType,
  ExtractStateType,
  ExtractActionType,
  ExtractInterceptorType,
  StateGetterCallType,
  StateSetterCallType,
} from '../types/store';

type CurrentStoreKeyType = 'delete';

function generateInitialState<TData>(): IDeleteStateData<TData> {
  return {
    status: 'default',
    error: null,
  };
}

// build initial state for delete.
export const buildInitialState = <TData, TFilter, TScheme>(
  state: ExtractStateType<
    null,
    null,
    null,
    null,
    TData,
    CurrentStoreKeyType,
    null,
    TScheme
  >
) => {
  state.delete = generateInitialState<TData>();
};

// build actions for list.
export const buildActions = <TData, TFilter, TScheme>(
  actions: ExtractActionType<
    null,
    null,
    null,
    null,
    TData,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  getState: StateGetterCallType<
    null,
    null,
    null,
    null,
    TData,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  setState: StateSetterCallType<
    null,
    null,
    null,
    null,
    TData,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  interceptors: ExtractInterceptorType<
    null,
    null,
    null,
    null,
    TData,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >
) => {
  // add delete method to action delete, that just calling delete interceptor method
  // which sending data to api server
  actions.remove = async (deleteData: TData | null): Promise<void | null> => {
    if (!deleteData) {
      return null;
    }

    const deleteState = getState().delete;
    deleteState.status = 'loading';
    setState({ delete: deleteState });

    try {
      const apiResult = await interceptors.remove(deleteData);
      if (!apiResult) {
        throw new Error('"delete" returned empty result.');
      }

      deleteState.status = 'success';

      setState({ delete: deleteState });
      return;
    } catch (e) {
      deleteState.status = 'error';
      deleteState.error = e as Error;

      setState({ delete: deleteState });
      return null;
    }
  };

  // reset to initial state
  actions.reset = () => {
    setState({ delete: generateInitialState<TData>() });
  };
};

// build root actions for add.
export const buildRootAction = <TData, TFilter, TScheme>(
  rootActions: ExtractActionType<
    null,
    null,
    null,
    null,
    TData,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  storeVanilla: RootStoreType<
    null,
    null,
    null,
    null,
    TData,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >
) => {
  const getVanillaState = () => {
    return storeVanilla.getState() as ExtractActionType<
      null,
      null,
      null,
      null,
      TData,
      CurrentStoreKeyType,
      TFilter,
      TScheme
    >;
  };

  rootActions.remove = (data: TData) => {
    return getVanillaState().remove(data);
  };

  rootActions.reset = () => {
    return getVanillaState().reset();
  };
};
