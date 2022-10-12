import type { ApiResponseType } from '@ultras/core-api-sdk';
import type { StatusType } from '../common';
import { IStateDataScheme, IScheme, IBeforeSend } from '../scheme';

type CreatePromiseType<TData> = undefined | Promise<ApiResponseType<TData>>;

export interface IAddStateData<TData, TScheme> {
  status: StatusType;
  error: null | Error;
  data: null | IStateDataScheme<TScheme>;
  valid: boolean;
  createdData: null | TData;
}

export interface AddGroupedStateType<TData, TScheme> {
  add: IAddStateData<TData, TScheme>;
}

export type AddGroupedActionType<TData> = {
  setAddFieldValue<TFieldKey extends keyof TData>(
    fieldKey: TFieldKey,
    fieldValue: TData[TFieldKey]
  ): void;
  create(): Promise<TData | null>;
  reset(): void;
};

export type AddGroupedInterceptorType<TData, TScheme> = {
  scheme: IScheme<TScheme>;
  beforeSend: IBeforeSend<TData, TScheme> | null;
  create(data: Partial<TData>): CreatePromiseType<TData>;
};
