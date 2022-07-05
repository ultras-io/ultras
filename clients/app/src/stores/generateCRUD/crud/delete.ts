import type {
  RootStoreType,
  ExtractStateType,
  ExtractActionType,
  ExtractInterceptorType,
  StateGetterCallType,
  StateSetterCallType,
} from '../types/store';

type CurrentStoreKeyType = 'delete';

// build initial state for delete.
export const buildInitialState = <TData, TFilter>(
  state: ExtractStateType<null, null, null, null, TData, CurrentStoreKeyType, null>
) => {
  state.delete = {
    status: 'loading',
    error: null,
  };
};

// build actions for list.
export const buildActions = <TData, TFilter>(
  actions: ExtractActionType<null, null, null, null, TData, CurrentStoreKeyType, TFilter>,
  getState: StateGetterCallType<
    null,
    null,
    null,
    null,
    TData,
    CurrentStoreKeyType,
    TFilter
  >,
  setState: StateSetterCallType<
    null,
    null,
    null,
    null,
    TData,
    CurrentStoreKeyType,
    TFilter
  >,
  interceptors: ExtractInterceptorType<
    null,
    null,
    null,
    null,
    TData,
    CurrentStoreKeyType,
    TFilter
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
};

// build root actions for add.
export const buildRootAction = <TData, TFilter>(
  rootActions: ExtractActionType<
    null,
    null,
    null,
    null,
    TData,
    CurrentStoreKeyType,
    TFilter
  >,
  storeVanilla: RootStoreType<null, null, null, null, TData, CurrentStoreKeyType, TFilter>
) => {
  const getVanillaState = () => {
    return storeVanilla.getState() as unknown as ExtractActionType<
      null,
      null,
      null,
      null,
      TData,
      CurrentStoreKeyType,
      TFilter
    >;
  };

  rootActions.remove = (data: TData) => {
    return getVanillaState().remove(data);
  };
};
