import type { ApiResponseType } from '@ultras/core-api-sdk';
import type { StatusType } from '../common';
import { IStateDataScheme, IScheme, IBeforeSend } from '../scheme';

type CreatePromiseType<TData> = undefined | Promise<ApiResponseType<TData>>;

export interface IAddStateData<TScheme> {
  status: StatusType;
  error: null | Error;
  data: null | IStateDataScheme<TScheme>;
  valid: boolean;
}

export interface IAddStateMethod<TData> {
  setFieldValue<TFieldKey extends keyof TData>(
    fieldKey: TFieldKey,
    fieldValue: TData[TFieldKey]
  ): void;
  reset(): void;
  create(): Promise<TData | null>;
}

export interface IAddState<TData, TScheme>
  extends IAddStateData<TScheme>,
    IAddStateMethod<TData> {}

export interface IAddGroupedState<TData, TScheme> {
  add: IAddState<TData, TScheme>;
}

export interface IAddGroupedInterceptor<TData, TScheme> {
  scheme: IScheme<TScheme>;
  beforeSend: IBeforeSend<TData, TScheme> | null;
  create(data: Partial<TData>): CreatePromiseType<TData>;
}

export interface IAddGetState<TData, TScheme> {
  (): IAddGroupedState<TData, TScheme>;
}

export interface IAddSetState<TData, TScheme> {
  (newState: IAddGroupedState<TData, TScheme>): void;
}
