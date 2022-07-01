import type {
  RootStoreType,
  ExtractStateType,
  ExtractActionType,
  ExtractInterceptorType,
  StateGetterCallType,
  StateSetterCallType,
} from '../types/store';
import type { SingleStateDataInterface } from '../types/crud/single';

type CurrentStoreKeyType = 'single';

// build initial state for single.
export const buildInitialState = <TData, TFilter>(
  state: ExtractStateType<TData, CurrentStoreKeyType, TFilter>
) => {
  state.single = {
    status: 'loading',
    error: null,
    data: null,
  };
};

// build actions for list.
export const buildActions = <TData, TFilter>(
  actions: ExtractActionType<TData, CurrentStoreKeyType, TFilter>,
  getState: StateGetterCallType<TData, CurrentStoreKeyType, TFilter>,
  setState: StateSetterCallType<TData, CurrentStoreKeyType, TFilter>,
  interceptors: ExtractInterceptorType<TData, CurrentStoreKeyType, TFilter>
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

      single.status = 'success';
      single.data = result.body.data;
    } catch (e) {
      single.status = 'error';
      single.error = e as Error;
    }

    setState({ single });
    return single;
  };
};

// build root actions for single.
export const buildRootAction = <TData, TFilter>(
  rootActions: ExtractActionType<TData, CurrentStoreKeyType, TFilter>,
  storeVanilla: RootStoreType<TData, CurrentStoreKeyType, TFilter>
) => {
  const getVanillaState = () => {
    return storeVanilla.getState() as unknown as ExtractActionType<
      TData,
      CurrentStoreKeyType,
      TFilter
    >;
  };

  rootActions.getSingle = (id: ResourceIdentifier) => {
    return getVanillaState().getSingle(id);
  };
};
