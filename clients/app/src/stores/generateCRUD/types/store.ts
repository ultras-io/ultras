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

export type RootStoreType<
  TDataViewModel,
  TDataCreate,
  TDataUpdate,
  TKey extends StateKeyType,
  TFilter
> = StoreApi<
  ExtractStateAndActionType<TDataViewModel, TDataCreate, TDataUpdate, TKey, TFilter>
>;

export interface InitStoreParamsInterface<TDataViewModel> {
  scheme: SchemeInterface;
  beforeSend: BeforeSendInterface<TDataViewModel>;
}

export type GroupedStateType<TDataViewModel, TDataCreate, TDataUpdate, TFilter> = {
  add: AddGroupedStateType<TDataCreate>;
  list: ListGroupedStateType<TDataViewModel, TFilter>;
  single: SingleGroupedStateType<TDataViewModel>;
};

export type GroupedActionType<TDataViewModel, TDataCreate, TDataUpdate, TFilter> = {
  add: AddGroupedActionType<TDataCreate>;
  list: ListGroupedActionType<TDataViewModel, TFilter>;
  single: SingleGroupedActionType<TDataViewModel>;
};

export type GroupedInterceptorType<TDataViewModel, TDataCreate, TDataUpdate, TFilter> = {
  add: AddGroupedInterceptorType<TDataCreate>;
  list: ListGroupedInterceptorType<TDataViewModel, TFilter>;
  single: SingleGroupedInterceptorType<TDataViewModel>;
};

export type ExtractStateType<
  TDataViewModel,
  TDataCreate,
  TDataUpdate,
  TStateItem extends StateKeyType,
  TFilter
> = MergeUnion<
  GroupedStateType<TDataViewModel, TDataCreate, TDataUpdate, TFilter>[TStateItem]
>;

export type ExtractActionType<
  TDataViewModel,
  TDataCreate,
  TDataUpdate,
  TStateItem extends StateKeyType,
  TFilter
> = MergeUnion<
  GroupedActionType<TDataViewModel, TDataCreate, TDataUpdate, TFilter>[TStateItem]
>;

export type ExtractInterceptorType<
  TDataViewModel,
  TDataCreate,
  TDataUpdate,
  TStateItem extends StateKeyType,
  TFilter
> = MergeUnion<
  GroupedInterceptorType<TDataViewModel, TDataCreate, TDataUpdate, TFilter>[TStateItem]
>;

export type ExtractStateAndActionType<
  TDataViewModel,
  TDataCreate,
  TDataUpdate,
  TStateItem extends StateKeyType,
  TFilter
> = ExtractStateType<TDataViewModel, TDataCreate, TDataUpdate, TStateItem, TFilter> &
  ExtractActionType<TDataViewModel, TDataCreate, TDataUpdate, TStateItem, TFilter>;

export type ParamsType<
  TDataViewModel,
  TDataCreate,
  TDataUpdate,
  TStateItem extends StateKeyType,
  TFilter
> = ExtractInterceptorType<
  TDataViewModel,
  TDataCreate,
  TDataUpdate,
  TStateItem,
  TFilter
> & {
  limit?: number;
  keys?: Array<StateKeyType>;
};

export type StateGetterCallType<
  TDataViewModel,
  TDataCreate,
  TDataUpdate,
  TKey extends StateKeyType,
  TFilter
> = () => ExtractStateType<TDataViewModel, TDataCreate, TDataUpdate, TKey, TFilter>;

export type StateSetterCallType<
  TDataViewModel,
  TDataCreate,
  TDataUpdate,
  TKey extends StateKeyType,
  TFilter
> = (
  args: ExtractStateType<TDataViewModel, TDataCreate, TDataUpdate, TKey, TFilter>
) => void;
