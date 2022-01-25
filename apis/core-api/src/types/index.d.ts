import * as Koa from 'Koa';
import * as Router from 'koa-router';
import { ListRequestParams, OrderEnum } from '@ultras/utils';

interface ExtendableContext extends Context {
  ok: (response?: string | Record<string, unknown>) => Koa.Context;
  created: (response?: string | Record<string, unknown>) => Koa.Context;
  noContent: (response?: string | Record<string, unknown>) => Koa.Context;
  badRequest: (response?: string | Record<string, unknown>) => Koa.Context;
  unauthorized: (response?: string | Record<string, unknown>) => Koa.Context;
  forbidden: (response?: string | Record<string, unknown>) => Koa.Context;
  notFound: (response?: string | Record<string, unknown>) => Koa.Context;
  locked: (response?: string | Record<string, unknown>) => Koa.Context;
  internalServerError: (response?: string | Record<string, unknown>) => Koa.Context;
  rateLimitExceeded: (response?: string | Record<string, unknown>) => Koa.Context;
  notImplemented: (response?: string | Record<string, unknown>) => Koa.Context;
}

export type Context = ExtendableContext<
  Koa.DefaultState,
  Koa.Context & Router.IRouterParamContext<Koa.DefaultState, Koa.Context>
>;

export type KoaApp = Koa<Koa.DefaultState, Koa.DefaultContext>;

export type ErrorDetail = Record<string, unknown> | null | string;

export type AuthErrorDetail = {
  name: string;
};

export type Exception = {
  status: number;
  statusName: string;

  // for client development  processes
  debug: string;
  details?: ErrorDetail;
};

// NOTE: replace with string if UUIDv4 will be used as data identifier.
export type DbIdentifier = number;

export interface ControllerListActionResult<T> {
  data: T[];
  limit: number;
  offset: number;
  count: number;
}

export interface ControllerActionOperatedResult<T> {
  data: T;
}

// #region controller params and result types
interface ControllerResultInterface<T> {
  data: T;
}

export type ControllerListParamsType<T> = T & ListRequestParams;

export type ControllerResultType<T> = Promise<ControllerResultInterface<T>>;

export type ControllerListResultType<T> = Promise<
  ControllerResultInterface<Array<T>> & {
    count: number;
    limit: number;
    offset: number;
  }
>;

export type ControllerByIdResultType<T> = ControllerResultType<T | null>;

export type ControllerInjectionResultType = ControllerResultType<{
  success: boolean;
}>;
// #endregion

// #region service params and result types
export type ServiceListParamsType<T> = T & ListRequestParams;

export type ServiceResultType<T> = Promise<T>;

export type ServiceListResultType<T> = ServiceResultType<{
  rows: Array<T>;
  count: number;
}>;

export type ServiceByIdResultType<T> = ServiceResultType<null | T>;
// #endregion
