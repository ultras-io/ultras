import type { FullFilterable } from '../types/common';
import type {
  RootStoreType,
  ExtractStateType,
  ExtractActionType,
  ExtractInterceptorType,
  StateGetterCallType,
  StateSetterCallType,
} from '../types/store';
import type { ListStateDataInterface } from '../types/crud/list';

import { buildFilterHash } from '../utils/helpers';

type CurrentStoreKeyType = 'list';

export const defaultLimit = 10;

// build initial state for list.
export const buildInitialState = <TData, TFilter>(
  state: ExtractStateType<TData, CurrentStoreKeyType, TFilter>
) => {
  state.list = {
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
};

// build actions for list.
export const buildActions = <TData, TFilter>(
  actions: ExtractActionType<TData, CurrentStoreKeyType, TFilter>,
  getState: StateGetterCallType<TData, CurrentStoreKeyType, TFilter>,
  setState: StateSetterCallType<TData, CurrentStoreKeyType, TFilter>,
  interceptors: ExtractInterceptorType<TData, CurrentStoreKeyType, TFilter>,
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
        filterData as unknown as FullFilterable<Partial<TFilter>>
      );

      if (!result) {
        throw new Error('"loadAll" returned empty result.');
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
};

// build root actions for list.
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

  rootActions.getAll = () => {
    return getVanillaState().getAll();
  };

  rootActions.updateFilter = (filter: Partial<TFilter>) => {
    return getVanillaState().updateFilter(filter);
  };
};
