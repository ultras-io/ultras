import { Middleware } from 'koa';

import { Context } from 'types';
import { responseModifier, errorModifier } from 'modules/modifier';

export default async (ctx: Context, next: () => Promise<Middleware>) => {
  try {
    await next();
    responseModifier(ctx);
    // logger.info(ctx);
  } catch (ex) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const error = errorModifier(ctx, ex).getError();

    const response: any = { error };
    if (ctx.newAuthToken && typeof response == 'object') {
      response.meta = response.meta || {};
      response.meta.auth_token = ctx.newAuthToken.authToken;
    }

    const ctxCall = ctx[error.statusName];
    ctxCall(response);
    // logger.info(ctx)
  }
};
