import type { ApiResponseType } from '@ultras/core-api-sdk';
import type { StatusType } from '../common';

type GetSinglePromiseType<TData> = undefined | Promise<ApiResponseType<TData>>;

export interface SingleStateDataInterface<TData> {
  status: StatusType;
  error: null | Error;
  data: null | TData;
}

export interface SingleGroupedStateType<TData> {
  single: SingleStateDataInterface<TData>;
}

export type SingleGroupedActionType<TData> = {
  getSingle(id: ResourceIdentifier): Promise<SingleStateDataInterface<TData>>;
  reset(): void;
};

export type SingleGroupedInterceptorType<TData> = {
  loadSingle(id: ResourceIdentifier): GetSinglePromiseType<TData>;
};
