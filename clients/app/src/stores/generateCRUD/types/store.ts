import type { StoreApi } from 'zustand/vanilla';
import type { MergeUnion, StateKeyType } from './common';
import type { IBeforeSend, IScheme } from './scheme';
import type { IAddGroupedInterceptor, IAddGroupedState } from './crud/add';
import type { ISingleGroupedInterceptor, ISingleGroupedState } from './crud/single';
import type { IListGroupedInterceptor, IListGroupedState } from './crud/list';
import type { IDeleteGroupedInterceptor, IDeleteGroupedState } from './crud/delete';
import { IUpdateGroupedInterceptor, IUpdateGroupedState } from './crud/update';

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

export interface IInitStoreParams<TDataViewModel, TScheme> {
  scheme: IScheme<TScheme>;
  beforeSend: IBeforeSend<TDataViewModel, TScheme>;
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
  add: IAddGroupedState<TDataCreate, TScheme>;
  list: IListGroupedState<TDataList, TFilter>;
  single: ISingleGroupedState<TDataSingle>;
  delete: IDeleteGroupedState<TDataDelete>;
  update: IUpdateGroupedState<TDataUpdate, TScheme>;
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
  add: IAddGroupedInterceptor<TDataCreate, TScheme>;
  list: IListGroupedInterceptor<TDataList, TFilter>;
  single: ISingleGroupedInterceptor<TDataSingle>;
  delete: IDeleteGroupedInterceptor<TDataDelete>;
  update: IUpdateGroupedInterceptor<TDataUpdate, TScheme>;
};

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
> = () => ExtractStateAndActionType<
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
  args: ExtractStateAndActionType<
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
