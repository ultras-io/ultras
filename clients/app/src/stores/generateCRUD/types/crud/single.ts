import type { ApiResponseType } from '@ultras/core-api-sdk';
import type { StatusType } from '../common';

type GetSinglePromiseType<TData> = undefined | Promise<ApiResponseType<TData>>;

export interface ISingleStateData<TData> {
  status: StatusType;
  error: null | Error;
  data: null | TData;
}

export interface ISingleStateMethod<TData> {
  getSingle(id: ResourceIdentifier): Promise<ISingleState<TData>>;
  reset(): void;
}

export interface ISingleState<TData>
  extends ISingleStateData<TData>,
    ISingleStateMethod<TData> {}

export interface ISingleGroupedState<TData> {
  single: ISingleState<TData>;
}

export interface ISingleGroupedInterceptor<TData> {
  loadSingle(id: ResourceIdentifier): GetSinglePromiseType<TData>;
}

export interface ISingleGetState<TData> {
  (): ISingleGroupedState<TData>;
}

export interface ISingleSetState<TData> {
  (newState: ISingleGroupedState<TData>): void;
}
