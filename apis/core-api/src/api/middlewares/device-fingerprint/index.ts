import { Middleware, Next as KoaNext } from 'koa';
import { Context } from 'types';
import { UserAgentService } from 'core/services';

const generateFingerprint = (ctx: Context): string => {
  const json = JSON.stringify({
    url: ctx.url,
    ua: ctx.headers['user-agent'] || '',
  });

  return Buffer.from(json).toString('base64');
};

const appendDeviceData = (ctx: Context) => {
  const userAgent = ctx.headers['user-agent'];

  ctx.device = ctx.device || {};
  ctx.device.fingerprint = generateFingerprint(ctx);
  ctx.device.os = UserAgentService.os(userAgent);
  ctx.device.browser = UserAgentService.browser(userAgent);
  ctx.device.type = UserAgentService.device(userAgent);
};

export default (): Middleware => {
  return (ctx: Context, next: KoaNext) => {
    appendDeviceData(ctx);
    return next();
  };
};
