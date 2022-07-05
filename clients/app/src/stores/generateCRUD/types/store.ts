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

export type RootStoreType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TKey extends StateKeyType,
  TFilter
> = StoreApi<
  ExtractStateAndActionType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TKey,
    TFilter
  >
>;

export interface InitStoreParamsInterface<TDataViewModel> {
  scheme: SchemeInterface;
  beforeSend: BeforeSendInterface<TDataViewModel>;
}

export type GroupedStateType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TFilter
> = {
  add: AddGroupedStateType<TDataCreate>;
  list: ListGroupedStateType<TDataList, TFilter>;
  single: SingleGroupedStateType<TDataSingle>;
  delete: DeleteGroupedStateType<TDataDelete>;
};

export type GroupedActionType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TFilter
> = {
  add: AddGroupedActionType<TDataCreate>;
  list: ListGroupedActionType<TDataList, TFilter>;
  single: SingleGroupedActionType<TDataSingle>;
  delete: DeleteGroupedActionType<TDataDelete>;
};

export type GroupedInterceptorType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TFilter
> = {
  add: AddGroupedInterceptorType<TDataCreate>;
  list: ListGroupedInterceptorType<TDataList, TFilter>;
  single: SingleGroupedInterceptorType<TDataSingle>;
  delete: DeleteGroupedInterceptorType<TDataDelete>;
};

export type ExtractStateType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TStateItem extends StateKeyType,
  TFilter
> = MergeUnion<
  GroupedStateType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TFilter
  >[TStateItem]
>;

export type ExtractActionType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TStateItem extends StateKeyType,
  TFilter
> = MergeUnion<
  GroupedActionType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TFilter
  >[TStateItem]
>;

export type ExtractInterceptorType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TStateItem extends StateKeyType,
  TFilter
> = MergeUnion<
  GroupedInterceptorType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TFilter
  >[TStateItem]
>;

export type ExtractStateAndActionType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TStateItem extends StateKeyType,
  TFilter
> = ExtractStateType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TStateItem,
  TFilter
> &
  ExtractActionType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TStateItem,
    TFilter
  >;

export type ParamsType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TStateItem extends StateKeyType,
  TFilter
> = ExtractInterceptorType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TStateItem,
  TFilter
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
  TFilter
> = () => ExtractStateType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TKey,
  TFilter
>;

export type StateSetterCallType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TKey extends StateKeyType,
  TFilter
> = (
  args: ExtractStateType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TKey,
    TFilter
  >
) => void;
