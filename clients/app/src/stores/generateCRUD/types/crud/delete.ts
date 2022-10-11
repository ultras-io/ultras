import { IResponse } from '@ultras/core-api-sdk/build/types';
import type { StatusType } from '../common';

type DeletePromiseType = undefined | Promise<void | IResponse>;

export interface IDeleteStateData<TData> {
  status: StatusType;
  error: null | Error;
}

export interface DeleteGroupedStateType<TData> {
  delete: IDeleteStateData<TData>;
}

export type DeleteGroupedActionType<TData> = {
  remove(data: TData): Promise<void | null>;
  reset(): void;
};

export type DeleteGroupedInterceptorType<TData> = {
  remove(data: Partial<TData>): DeletePromiseType;
};
