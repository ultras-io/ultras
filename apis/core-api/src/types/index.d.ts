import * as Koa from 'koa';
import * as Router from 'koa-router';
import { ListRequestParams } from '@ultras/utils';
import {
  BrowserType,
  OperationSystemType,
  DeviceType,
} from 'core/services/UserAgentService';

type ExtendableContextCallType = (
  response?: string | Record<string, unknown>
) => Koa.Context;

interface ExtendableContext extends Context {
  ok: ExtendableContextCallType;
  created: ExtendableContextCallType;
  noContent: ExtendableContextCallType;
  badRequest: ExtendableContextCallType;
  unauthorized: ExtendableContextCallType;
  forbidden: ExtendableContextCallType;
  notFound: ExtendableContextCallType;
  locked: ExtendableContextCallType;
  internalServerError: ExtendableContextCallType;
  rateLimitExceeded: ExtendableContextCallType;
  notImplemented: ExtendableContextCallType;
  device: {
    fingerprint: string;
    os: OperationSystemType;
    browser: BrowserType;
    type: DeviceType;
  };
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
type ControllerResultBaseType<T, P = {}> = P & {
  data: T;
};

export type ControllerListParamsType<T> = T & ListRequestParams;

export type ControllerResultType<T, P = {}> = Promise<ControllerResultBaseType<T, P>>;

export type ControllerListResultType<T, P = {}> = Promise<
  ControllerResultBaseType<Array<T>> & {
    count: number;
    limit: number;
    offset: number;
  },
  P
>;

export type ControllerByIdResultType<T, P = {}> = ControllerResultType<T | null, P>;

export type ControllerInjectionResultType<P = {}> = ControllerResultType<
  {
    success: boolean;
  },
  P
>;
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
