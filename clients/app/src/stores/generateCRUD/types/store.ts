import type { StoreApi } from 'zustand/vanilla';
import type { MergeUnion, StateKeyType } from './common';
import type { BeforeSendInterface, SchemeInterface } from './scheme';
import type {
  AddGroupedActionType,
  AddGroupedStateType,
  AddGroupedInterceptorType,
} from './crud/add';
import type {
  SingleGroupedActionType,
  SingleGroupedStateType,
  SingleGroupedInterceptorType,
} from './crud/single';
import type {
  ListGroupedActionType,
  ListGroupedStateType,
  ListGroupedInterceptorType,
} from './crud/list';

export type RootStoreType<TData, TKey extends StateKeyType, TFilter> = StoreApi<
  ExtractStateAndActionType<TData, TKey, TFilter>
>;

export interface InitStoreParamsInterface<TData> {
  scheme: SchemeInterface;
  beforeSend: BeforeSendInterface<TData>;
}

export type GroupedStateType<TData, TFilter> = {
  add: AddGroupedStateType<TData>;
  list: ListGroupedStateType<TData, TFilter>;
  single: SingleGroupedStateType<TData>;
};

export type GroupedActionType<TData, TFilter> = {
  add: AddGroupedActionType<TData>;
  list: ListGroupedActionType<TData, TFilter>;
  single: SingleGroupedActionType<TData>;
};

export type GroupedInterceptorType<TData, TFilter> = {
  add: AddGroupedInterceptorType<TData>;
  list: ListGroupedInterceptorType<TData, TFilter>;
  single: SingleGroupedInterceptorType<TData>;
};

export type ExtractStateType<
  TData,
  TStateItem extends StateKeyType,
  TFilter
> = MergeUnion<GroupedStateType<TData, TFilter>[TStateItem]>;

export type ExtractActionType<
  TData,
  TStateItem extends StateKeyType,
  TFilter
> = MergeUnion<GroupedActionType<TData, TFilter>[TStateItem]>;

export type ExtractInterceptorType<
  TData,
  TStateItem extends StateKeyType,
  TFilter
> = MergeUnion<GroupedInterceptorType<TData, TFilter>[TStateItem]>;

export type ExtractStateAndActionType<
  TData,
  TStateItem extends StateKeyType,
  TFilter
> = ExtractStateType<TData, TStateItem, TFilter> &
  ExtractActionType<TData, TStateItem, TFilter>;

export type ParamsType<
  TData,
  TStateItem extends StateKeyType,
  TFilter
> = ExtractInterceptorType<TData, TStateItem, TFilter> & {
  limit?: number;
  keys?: Array<StateKeyType>;
};

export type StateGetterCallType<
  TData,
  TKey extends StateKeyType,
  TFilter
> = () => ExtractStateType<TData, TKey, TFilter>;

export type StateSetterCallType<TData, TKey extends StateKeyType, TFilter> = (
  args: ExtractStateType<TData, TKey, TFilter>
) => void;
