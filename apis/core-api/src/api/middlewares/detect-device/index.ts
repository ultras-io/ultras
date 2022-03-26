import { Middleware, Next as KoaNext } from 'koa';
import { Context } from 'types';
import { UserAgentService } from 'core/services';

/**
 * Generate device fingerprint.
 */
const generateFingerprint = (ctx: Context): string => {
  // DON'T include request specific data
  const json = JSON.stringify({
    osName: ctx.device.os.name,
    osVersion: ctx.device.os.version,
    browser: ctx.device.browser,
    type: ctx.device.type,
  });

  return Buffer.from(json).toString('base64');
};

/**
 * Append user agent parsed data to context and generate
 * specific fingerprint ID for device.
 */
const appendDeviceData = (ctx: Context) => {
  const userAgent = ctx.headers['user-agent'];

  ctx.device = ctx.device || {};
  ctx.device.os = UserAgentService.os(userAgent);
  ctx.device.browser = UserAgentService.browser(userAgent);
  ctx.device.type = UserAgentService.device(userAgent);
  ctx.device.fingerprint = generateFingerprint(ctx);
};

export default (): Middleware => {
  return (ctx: Context, next: KoaNext) => {
    appendDeviceData(ctx);
    return next();
  };
};
