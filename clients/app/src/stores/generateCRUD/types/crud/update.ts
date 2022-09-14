import type { ApiResponseType } from '@ultras/core-api-sdk';
import type { StatusType } from '../common';
import {
  StateDataSchemeInterface,
  SchemeInterface,
  BeforeSendInterface,
} from '../scheme';

type CreatePromiseType<TData> = undefined | Promise<ApiResponseType<TData>>;

export interface UpdateStateDataInterface<TData, TScheme> {
  status: StatusType;
  resourceId: Nullable<ResourceIdentifier>;
  error: null | Error;
  data: null | StateDataSchemeInterface<TScheme>;
  valid: boolean;
}

export interface UpdateGroupedStateType<TData, TScheme> {
  update: UpdateStateDataInterface<TData, TScheme>;
}

export type UpdateGroupedActionType<TData> = {
  setResourceId(resourceId: ResourceIdentifier): void;
  setFieldValue<TFieldKey extends keyof TData>(
    fieldKey: TFieldKey,
    fieldValue: TData[TFieldKey]
  ): void;
  update(): Promise<TData | null>;
  reset(): void;
};

export type UpdateGroupedInterceptorType<TData, TScheme> = {
  scheme: SchemeInterface<TScheme>;
  beforeSend: BeforeSendInterface<TData, TScheme> | null;
  update(
    resourceId: Nullable<ResourceIdentifier>,
    data: Partial<TData>
  ): CreatePromiseType<TData>;
};
