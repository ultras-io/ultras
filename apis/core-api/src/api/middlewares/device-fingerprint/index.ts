import { Middleware, Next as KoaNext } from 'koa';
import { Context } from 'types';

const generateFingerprint = (ctx: Context): string => {
  return ctx.headers['user-agent'];
};

export default (): Middleware => {
  return (ctx: Context, next: KoaNext) => {
    ctx.fingerprint = generateFingerprint(ctx);
    return next();
  };
};
