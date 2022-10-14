import type {
  IListGetState,
  IListGroupedInterceptor,
  IListGroupedState,
  IListSetState,
  IListState,
  IListStateData,
} from '../types/crud/list';
import type { FullFilterable } from '../types/common';

import { buildFilterHash } from '../utils/helpers';

function generateInitialState<TData, TFilter>(): IListStateData<TData, TFilter> {
  return {
    status: 'loading',
    error: null,
    data: null,
    filter: null,
    filterHash: null,
    pagination: {
      total: null,
      limit: 0,
      offset: 0,
    },
  };
}

export const defaultLimit = 10;

// build initial state for list.
export const buildInitialState = <TData, TFilter>(
  state: IListGroupedState<TData, TFilter>
) => {
  state.list = state.list || {};
  state.list = {
    ...state.list,
    ...generateInitialState<TData, TFilter>(),
  };
};

// build actions for list.
export const buildActions = <TData, TFilter>(
  actions: IListGroupedState<TData, TFilter>,
  getState: IListGetState<TData, TFilter>,
  setState: IListSetState<TData, TFilter>,
  interceptors: IListGroupedInterceptor<TData, TFilter>,
  fetchLimit: number = defaultLimit
) => {
  actions.list = {
    ...actions.list,

    // add updateFilter method to action list, that partially updates filter values,
    // after updating filter getAll method must be called to load data with new filter
    //
    // filterHash will be calculated in getAll step
    updateFilter(filter: Partial<TFilter>) {
      const list = getState().list;
      list.filter = list.filter || {};

      Object.keys(filter).forEach((filterKey: string) => {
        const key = filterKey as keyof TFilter;
        (list.filter as Partial<TFilter>)[key] = filter[key];
      });
    },

    // add getAll method to action list, that just calling loadAll interceptor method
    // and updates "list" state
    async getAll(): Promise<IListState<TData, TFilter>> {
      const list = getState().list;

      // we need to reset previously loaded data if filter was changed
      const filterHash = buildFilterHash(list.filter);
      if (filterHash !== list.filterHash) {
        list.filterHash = filterHash;
        list.data = null;
        list.pagination.limit = 0;
        list.pagination.offset = 0;
        list.pagination.total = null;
      }

      const itemsLimit = fetchLimit || defaultLimit;
      const itemsCount = list.data?.length || 0;

      if (list.pagination.total === itemsCount) {
        return list;
      }

      list.status = 'loading';
      setState({ list });

      try {
        const filterData = {
          // the limit attribute can be overridden by updateFilter(),
          // that's why limit is above spread operator.
          limit: itemsLimit,

          // spreading provided filter.
          ...(list.filter || {}),

          // but offset is calculated internally, that's why offset
          // is below spread operator.
          offset: itemsCount,
        };

        const result = await interceptors.loadAll(
          filterData as FullFilterable<Partial<TFilter>>
        );

        if (!result) {
          throw new Error('"loadAll" returned empty result.');
        }

        if (!result.body.success) {
          const message = JSON.stringify(result.body.error);
          throw new Error(`Error received: ${message}`);
        }

        list.data = (list.data || []).concat(result.body.data);
        list.status = 'success';
        list.pagination.total = result.body.meta.pagination.total;
        list.pagination.offset = result.body.meta.pagination.offset;
        list.pagination.limit = result.body.meta.pagination.limit;
      } catch (e) {
        list.status = 'error';
        list.error = e as Error;
      }

      setState({ list });
      return list;
    },

    // reset to initial state
    reset() {
      setState({
        list: {
          ...getState().list,
          ...generateInitialState<TData, TFilter>(),
        },
      });
    },
  };
};

// build state and actions for list.
export const build = <TData, TFilter>(
  stateAndActions: IListGroupedState<TData, TFilter>,
  getState: IListGetState<TData, TFilter>,
  setState: IListSetState<TData, TFilter>,
  interceptors: IListGroupedInterceptor<TData, TFilter>,
  fetchLimit: number = defaultLimit
) => {
  buildInitialState(stateAndActions);
  buildActions(stateAndActions, getState, setState, interceptors, fetchLimit);
};
