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
import type {
  DeleteGroupedActionType,
  DeleteGroupedInterceptorType,
  DeleteGroupedStateType,
} from './crud/delete';
import {
  UpdateGroupedActionType,
  UpdateGroupedInterceptorType,
  UpdateGroupedStateType,
} from './crud/update';

export type RootStoreType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TKey extends StateKeyType,
  TFilter,
  TScheme
> = StoreApi<
  ExtractStateAndActionType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TKey,
    TFilter,
    TScheme
  >
>;

export interface InitStoreParamsInterface<TDataViewModel, TScheme> {
  scheme: SchemeInterface<TScheme>;
  beforeSend: BeforeSendInterface<TDataViewModel, TScheme>;
}

export type GroupedStateType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TFilter,
  TScheme
> = {
  add: AddGroupedStateType<TDataCreate, TScheme>;
  list: ListGroupedStateType<TDataList, TFilter>;
  single: SingleGroupedStateType<TDataSingle>;
  delete: DeleteGroupedStateType<TDataDelete>;
  update: UpdateGroupedStateType<TDataUpdate, TScheme>;
};

export type GroupedActionType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TFilter,
  TScheme
> = {
  add: AddGroupedActionType<TDataCreate>;
  list: ListGroupedActionType<TDataList, TFilter>;
  single: SingleGroupedActionType<TDataSingle>;
  delete: DeleteGroupedActionType<TDataDelete>;
  update: UpdateGroupedActionType<TDataUpdate>;
};

export type GroupedInterceptorType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TFilter,
  TScheme
> = {
  add: AddGroupedInterceptorType<TDataCreate, TScheme>;
  list: ListGroupedInterceptorType<TDataList, TFilter>;
  single: SingleGroupedInterceptorType<TDataSingle>;
  delete: DeleteGroupedInterceptorType<TDataDelete>;
  update: UpdateGroupedInterceptorType<TDataUpdate, TScheme>;
};

export type ExtractStateType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TStateItem extends StateKeyType,
  TFilter,
  TScheme
> = MergeUnion<
  GroupedStateType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TFilter,
    TScheme
  >[TStateItem]
>;

export type ExtractActionType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TStateItem extends StateKeyType,
  TFilter,
  TScheme
> = MergeUnion<
  GroupedActionType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TFilter,
    TScheme
  >[TStateItem]
>;

export type ExtractInterceptorType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TStateItem extends StateKeyType,
  TFilter,
  TScheme
> = MergeUnion<
  GroupedInterceptorType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TFilter,
    TScheme
  >[TStateItem]
>;

export type ExtractStateAndActionType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TStateItem extends StateKeyType,
  TFilter,
  TScheme
> = ExtractStateType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TStateItem,
  TFilter,
  TScheme
> &
  ExtractActionType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TStateItem,
    TFilter,
    TScheme
  >;

export type ParamsType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TStateItem extends StateKeyType,
  TFilter,
  TScheme
> = ExtractInterceptorType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TStateItem,
  TFilter,
  TScheme
> & {
  limit?: number;
  keys?: Array<StateKeyType>;
};

export type StateGetterCallType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TKey extends StateKeyType,
  TFilter,
  TScheme
> = () => ExtractStateType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TKey,
  TFilter,
  TScheme
>;

export type StateSetterCallType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TKey extends StateKeyType,
  TFilter,
  TScheme
> = (
  args: ExtractStateType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TKey,
    TFilter,
    TScheme
  >
) => void;
