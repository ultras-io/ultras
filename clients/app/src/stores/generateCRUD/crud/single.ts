import type {
  ISingleGetState,
  ISingleGroupedInterceptor,
  ISingleGroupedState,
  ISingleSetState,
  ISingleState,
  ISingleStateData,
} from '../types/crud/single';

function generateInitialState<TData>(): ISingleStateData<TData> {
  return {
    status: 'loading',
    error: null,
    data: null,
  };
}

// build initial state for single.
export const buildInitialState = <TData>(state: ISingleGroupedState<TData>) => {
  state.single = state.single || {};
  state.single = {
    ...state.single,
    ...generateInitialState<TData>(),
  };
};

// build actions for single.
export const buildActions = <TData>(
  actions: ISingleGroupedState<TData>,
  getState: ISingleGetState<TData>,
  setState: ISingleSetState<TData>,
  interceptors: ISingleGroupedInterceptor<TData>
) => {
  actions.single = {
    ...actions.single,

    // add getSingle method to action list, that just calling loadSingle interceptor method
    // and updates "single" state
    async getSingle(id: ResourceIdentifier): Promise<ISingleState<TData>> {
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
    },

    // reset to initial state
    reset() {
      setState({
        single: {
          ...getState().single,
          ...generateInitialState<TData>(),
        },
      });
    },
  };
};

// build state and actions for single.
export const build = <TData>(
  stateAndActions: ISingleGroupedState<TData>,
  getState: ISingleGetState<TData>,
  setState: ISingleSetState<TData>,
  interceptors: ISingleGroupedInterceptor<TData>
) => {
  buildInitialState(stateAndActions);
  buildActions(stateAndActions, getState, setState, interceptors);
};
