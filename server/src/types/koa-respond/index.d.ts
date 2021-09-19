declare module 'koa-respond' {
  import * as Koa from 'koa';

  type Options = {
    statusMethods: Record<string, unknown>;
  };

  declare function respond(options: Options): Koa.Middleware<unknown, unknown>;

  export default respond;
}
