import { ResponseInterface } from '@ultras/core-api-sdk/build/types';
import type { StatusType } from '../common';

type DeletePromiseType = undefined | Promise<void | ResponseInterface>;

export interface DeleteStateDataInterface<TData> {
  status: StatusType;
  error: null | Error;
}

export interface DeleteGroupedStateType<TData> {
  delete: DeleteStateDataInterface<TData>;
}

export type DeleteGroupedActionType<TData> = {
  remove(data: TData): Promise<void | null>;
};

export type DeleteGroupedInterceptorType<TData> = {
  remove(data: Partial<TData>): DeletePromiseType;
};
