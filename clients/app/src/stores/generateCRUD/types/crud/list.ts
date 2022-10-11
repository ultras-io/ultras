import type { ApiResponseType, ListResponseMetaType } from '@ultras/core-api-sdk';
import type { StatusType, Filterable, FullFilterable } from '../common';

type GetListPromiseType<TData> =
  | undefined
  | Promise<ApiResponseType<Array<TData>, ListResponseMetaType>>;

export interface IListStateData<TData, TFilter> {
  status: StatusType;
  error: null | Error;
  data: null | Array<TData>;
  filter: null | Partial<Filterable<TFilter>>;
  filterHash: null | string;
  pagination: {
    total: null | number;
    limit: number;
    offset: number;
  };
}

export interface ListGroupedStateType<TData, TFilter> {
  list: IListStateData<TData, TFilter>;
}

export type ListGroupedActionType<TData, TFilter> = {
  getAll(): Promise<IListStateData<TData, TFilter>>;
  updateFilter(filter: Partial<TFilter>): void;
  reset(): void;
};

export type ListGroupedInterceptorType<TData, TFilter> = {
  loadAll(filter: FullFilterable<Partial<TFilter>>): GetListPromiseType<TData>;
};
