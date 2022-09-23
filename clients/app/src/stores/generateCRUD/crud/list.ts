import type { ListStateDataInterface } from '../types/crud/list';
import type { FullFilterable } from '../types/common';
import type {
  RootStoreType,
  ExtractStateType,
  ExtractActionType,
  ExtractInterceptorType,
  StateGetterCallType,
  StateSetterCallType,
} from '../types/store';

import { buildFilterHash } from '../utils/helpers';

type CurrentStoreKeyType = 'list';

function generateInitialState<TData, TFilter>(): ListStateDataInterface<TData, TFilter> {
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
export const buildInitialState = <TData, TFilter, TScheme>(
  state: ExtractStateType<
    TData,
    null,
    null,
    null,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >
) => {
  state.list = generateInitialState<TData, TFilter>();
};

// build actions for list.
export const buildActions = <TData, TFilter, TScheme>(
  actions: ExtractActionType<
    TData,
    null,
    null,
    null,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  getState: StateGetterCallType<
    TData,
    null,
    null,
    null,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  setState: StateSetterCallType<
    TData,
    null,
    null,
    null,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  interceptors: ExtractInterceptorType<
    TData,
    null,
    null,
    null,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  fetchLimit: number = defaultLimit
) => {
  // add updateFilter method to action list, that partially updates filter values,
  // after updating filter getAll method must be called to load data with new filter
  //
  // filterHash will be calculated in getAll step
  actions.updateFilter = (filter: Partial<TFilter>) => {
    const list = getState().list;
    list.filter = list.filter || {};

    Object.keys(filter).forEach((filterKey: string) => {
      const key = filterKey as keyof TFilter;
      (list.filter as Partial<TFilter>)[key] = filter[key];
    });
  };

  // add getAll method to action list, that just calling loadAll interceptor method
  // and updates "list" state
  actions.getAll = async (): Promise<ListStateDataInterface<TData, TFilter>> => {
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
        // the limit attribute can be overriden by updateFilter(),
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
  };

  // reset to initial state
  actions.reset = () => {
    setState({ list: generateInitialState<TData, TFilter>() });
  };
};

// build root actions for list.
export const buildRootAction = <TData, TFilter, TScheme>(
  rootActions: ExtractActionType<
    TData,
    null,
    null,
    null,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  storeVanilla: RootStoreType<
    TData,
    null,
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
      TData,
      null,
      null,
      null,
      null,
      CurrentStoreKeyType,
      TFilter,
      TScheme
    >;
  };

  rootActions.getAll = () => {
    return getVanillaState().getAll();
  };

  rootActions.updateFilter = (filter: Partial<TFilter>) => {
    return getVanillaState().updateFilter(filter);
  };

  rootActions.reset = () => {
    return getVanillaState().reset();
  };
};
