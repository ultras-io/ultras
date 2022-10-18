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

export interface IListStateMethod<TData, TFilter> {
  getAll(): Promise<IListState<TData, TFilter>>;
  updateFilter(filter: Partial<TFilter>): void;
  reset(): void;
}

export interface IListState<TData, TFilter>
  extends IListStateData<TData, TFilter>,
    IListStateMethod<TData, TFilter> {}

export interface IListGroupedState<TData, TFilter> {
  list: IListState<TData, TFilter>;
}

export type IListGroupedInterceptor<TData, TFilter> = {
  loadAll(filter: FullFilterable<Partial<TFilter>>): GetListPromiseType<TData>;
};

export interface IListGetState<TData, TFilter> {
  (): IListGroupedState<TData, TFilter>;
}

export interface IListSetState<TData, TFilter> {
  (newState: IListGroupedState<TData, TFilter>): void;
}
