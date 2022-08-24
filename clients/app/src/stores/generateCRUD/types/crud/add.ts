import type { ApiResponseType } from '@ultras/core-api-sdk';
import type { StatusType } from '../common';
import {
  StateDataSchemeInterface,
  SchemeInterface,
  BeforeSendInterface,
} from '../scheme';

type CreatePromiseType<TData> = undefined | Promise<ApiResponseType<TData>>;

export interface AddStateDataInterface<TData, TScheme> {
  status: StatusType;
  error: null | Error;
  data: null | StateDataSchemeInterface<TScheme>;
  valid: boolean;
}

export interface AddGroupedStateType<TData, TScheme> {
  add: AddStateDataInterface<TData, TScheme>;
}

export type AddGroupedActionType<TData> = {
  setFieldValue<TFieldKey extends keyof TData>(
    fieldKey: TFieldKey,
    fieldValue: TData[TFieldKey]
  ): void;
  create(): Promise<TData | null>;
  reset(): void;
};

export type AddGroupedInterceptorType<TData, TScheme> = {
  scheme: SchemeInterface<TScheme>;
  beforeSend: BeforeSendInterface<TData, TScheme> | null;
  create(data: Partial<TData>): CreatePromiseType<TData>;
};
