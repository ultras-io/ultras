import type { ApiResponseType } from '@ultras/core-api-sdk';
import type { StatusType } from '../common';
import {
  IStateDataScheme,
  IScheme,
  IBeforeSend,
} from '../scheme';

type CreatePromiseType<TData> = undefined | Promise<ApiResponseType<TData>>;

export interface IUpdateStateData<TData, TScheme> {
  status: StatusType;
  resourceId: Nullable<ResourceIdentifier>;
  error: null | Error;
  data: null | IStateDataScheme<TScheme>;
  valid: boolean;
}

export interface UpdateGroupedStateType<TData, TScheme> {
  update: IUpdateStateData<TData, TScheme>;
}

export type UpdateGroupedActionType<TData> = {
  setResourceId(resourceId: ResourceIdentifier): void;
  setUpdateFieldValue<TFieldKey extends keyof TData>(
    fieldKey: TFieldKey,
    fieldValue: TData[TFieldKey]
  ): void;
  updateData(): Promise<TData | null>;
  reset(): void;
};

export type UpdateGroupedInterceptorType<TData, TScheme> = {
  scheme: IScheme<TScheme>;
  beforeSend: IBeforeSend<TData, TScheme> | null;
  updateData(
    resourceId: Nullable<ResourceIdentifier>,
    data: Partial<TData>
  ): CreatePromiseType<TData>;
};
