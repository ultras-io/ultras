import { IResponse } from '@ultras/core-api-sdk';
import type { StatusType } from '../common';

type DeletePromiseType = undefined | Promise<void | IResponse>;

export interface IDeleteStateData {
  status: StatusType;
  error: null | Error;
}
export interface IDeleteStateMethod<TData> {
  reset(): void;
  remove(data: TData): Promise<void | null>;
}

export interface IDeleteState<TData>
  extends IDeleteStateData,
    IDeleteStateMethod<TData> {}

export interface IDeleteGroupedState<TData> {
  delete: IDeleteState<TData>;
}

export interface IDeleteGroupedInterceptor<TData> {
  remove(data: Partial<TData>): DeletePromiseType;
}

export interface IDeleteGetState<TData> {
  (): IDeleteGroupedState<TData>;
}

export interface IDeleteSetState<TData> {
  (newState: IDeleteGroupedState<TData>): void;
}
