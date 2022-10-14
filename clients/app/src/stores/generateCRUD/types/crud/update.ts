import type { ApiResponseType } from '@ultras/core-api-sdk';
import type { StatusType } from '../common';
import { IStateDataScheme, IScheme, IBeforeSend } from '../scheme';

type CreatePromiseType<TData> = undefined | Promise<ApiResponseType<TData>>;

export interface IUpdateStateData<TScheme> {
  status: StatusType;
  resourceId: Nullable<ResourceIdentifier>;
  error: null | Error;
  data: null | IStateDataScheme<TScheme>;
  valid: boolean;
}

export interface IUpdateStateMethod<TData> {
  setResourceId(resourceId: ResourceIdentifier): void;
  setFieldValue<TFieldKey extends keyof TData>(
    fieldKey: TFieldKey,
    fieldValue: TData[TFieldKey]
  ): void;
  reset(): void;
  update(): Promise<TData | null>;
}

export interface IUpdateState<TData, TScheme>
  extends IUpdateStateData<TScheme>,
    IUpdateStateMethod<TData> {}

export interface IUpdateGroupedState<TData, TScheme> {
  update: IUpdateState<TData, TScheme>;
}

export type IUpdateGroupedInterceptor<TData, TScheme> = {
  scheme: IScheme<TScheme>;
  beforeSend: IBeforeSend<TData, TScheme> | null;
  update(
    resourceId: Nullable<ResourceIdentifier>,
    data: Partial<TData>
  ): CreatePromiseType<TData>;
};

export interface IUpdateGetState<TData, TScheme> {
  (): IUpdateGroupedState<TData, TScheme>;
}

export interface IUpdateSetState<TData, TScheme> {
  (newState: IUpdateGroupedState<TData, TScheme>): void;
}
