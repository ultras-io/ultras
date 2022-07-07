import type { ApiResponseType } from '@ultras/core-api-sdk';
import type { StatusType } from '../common';
import {
  StateDataSchemeInterface,
  SchemeInterface,
  BeforeSendInterface,
} from '../scheme';

type CreatePromiseType<TData> = undefined | Promise<ApiResponseType<TData>>;

export interface AddStateDataInterface<TData> {
  status: StatusType;
  error: null | Error;
  data: null | StateDataSchemeInterface;
  valid: boolean;
}

export interface AddGroupedStateType<TData> {
  add: AddStateDataInterface<TData>;
}

export type AddGroupedActionType<TData> = {
  setFieldValue<TFieldKey extends keyof TData>(
    fieldKey: TFieldKey,
    fieldValue: TData[TFieldKey]
  ): void;
  create(): Promise<TData | null>;
};

export type AddGroupedInterceptorType<TData> = {
  scheme: SchemeInterface;
  beforeSend: BeforeSendInterface<TData> | null;
  create<TResult>(data: Partial<TData>): CreatePromiseType<TResult>;
};
