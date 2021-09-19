import * as Koa from 'Koa';
import * as Router from 'koa-router';

interface ExtendableContext extends Context {
  ok: (response?: string | Record<string, unknown>) => Koa.Context;
  created: (response?: string | Record<string, unknown>) => Koa.Context;
  noContent: (response?: string | Record<string, unknown>) => Koa.Context;
  badRequest: (response?: string | Record<string, unknown>) => Koa.Context;
  unauthorized: (response?: string | Record<string, unknown>) => Koa.Context;
  forbidden: (response?: string | Record<string, unknown>) => Koa.Context;
  notFound: (response?: string | Record<string, unknown>) => Koa.Context;
  locked: (response?: string | Record<string, unknown>) => Koa.Context;
  internalServerError: (
    response?: string | Record<string, unknown>,
  ) => Koa.Context;
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
