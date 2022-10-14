import type {
  IDeleteGetState,
  IDeleteGroupedInterceptor,
  IDeleteGroupedState,
  IDeleteSetState,
  IDeleteStateData,
} from '../types/crud/delete';

function generateInitialState(): IDeleteStateData {
  return {
    status: 'default',
    error: null,
  };
}

// build initial state for delete.
export const buildInitialState = <TData>(state: IDeleteGroupedState<TData>) => {
  state.delete = state.delete || {};
  state.delete = {
    ...state.delete,
    ...generateInitialState(),
  };
};

// build actions for delete.
export const buildActions = <TData>(
  actions: IDeleteGroupedState<TData>,
  getState: IDeleteGetState<TData>,
  setState: IDeleteSetState<TData>,
  interceptors: IDeleteGroupedInterceptor<TData>
) => {
  actions.delete = {
    ...actions.delete,

    // add delete method to action delete, that just calling delete interceptor method
    // which sending data to api server
    async remove(deleteData: TData | null): Promise<void | null> {
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
    },

    // reset to initial state
    reset() {
      setState({
        delete: {
          ...getState().delete,
          ...generateInitialState(),
        },
      });
    },
  };
};

// build state and actions for delete.
export const build = <TData>(
  stateAndActions: IDeleteGroupedState<TData>,
  getState: IDeleteGetState<TData>,
  setState: IDeleteSetState<TData>,
  interceptors: IDeleteGroupedInterceptor<TData>
) => {
  buildInitialState(stateAndActions);
  buildActions(stateAndActions, getState, setState, interceptors);
};
