import type { SingleStateDataInterface } from '../types/crud/single';
import type {
  RootStoreType,
  ExtractStateType,
  ExtractActionType,
  ExtractInterceptorType,
  StateGetterCallType,
  StateSetterCallType,
} from '../types/store';

type CurrentStoreKeyType = 'single';

function generateInitialState<TData>(): SingleStateDataInterface<TData> {
  return {
    status: 'loading',
    error: null,
    data: null,
  };
}

// build initial state for single.
export const buildInitialState = <TData, TFilter, TScheme>(
  state: ExtractStateType<
    null,
    TData,
    null,
    null,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >
) => {
  state.single = generateInitialState<TData>();
};

// build actions for list.
export const buildActions = <TData, TFilter, TScheme>(
  actions: ExtractActionType<
    null,
    TData,
    null,
    null,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  getState: StateGetterCallType<
    null,
    TData,
    null,
    null,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  setState: StateSetterCallType<
    null,
    TData,
    null,
    null,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  interceptors: ExtractInterceptorType<
    null,
    TData,
    null,
    null,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >
) => {
  // add getSingle method to action list, that just calling loadSingle interceptor method
  // and updates "single" state
  actions.getSingle = async (
    id: ResourceIdentifier
  ): Promise<SingleStateDataInterface<TData>> => {
    const single = getState().single;
    single.status = 'loading';
    setState({ single });

    try {
      const result = await interceptors.loadSingle(id);
      if (!result) {
        throw new Error('"loadSingle" returned empty result.');
      }

      if (!result.body.success) {
        const message = JSON.stringify(result.body.error);
        throw new Error(`Error received: ${message}`);
      }

      single.status = 'success';
      single.data = result.body.data;
    } catch (e) {
      single.status = 'error';
      single.error = e as Error;
    }

    setState({ single });
    return single;
  };

  // reset to initial state
  actions.reset = () => {
    setState({ single: generateInitialState<TData>() });
  };
};

// build root actions for single.
export const buildRootAction = <TData, TFilter, TScheme>(
  rootActions: ExtractActionType<
    null,
    TData,
    null,
    null,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  storeVanilla: RootStoreType<
    null,
    TData,
    null,
    null,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >
) => {
  const getVanillaState = () => {
    return storeVanilla.getState() as ExtractActionType<
      null,
      TData,
      null,
      null,
      null,
      CurrentStoreKeyType,
      TFilter,
      TScheme
    >;
  };

  rootActions.getSingle = (id: ResourceIdentifier) => {
    return getVanillaState().getSingle(id);
  };

  rootActions.reset = () => {
    return getVanillaState().reset();
  };
};
