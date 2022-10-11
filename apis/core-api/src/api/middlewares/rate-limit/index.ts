import { Middleware } from 'koa';
import rateLimit from 'koa-ratelimit';
import { Context } from 'types';
import { RedisService } from 'core/services';

interface IOptions {
  seconds: number;
  requests: number;
}

const getClientFingerprint = (ctx: Context): string => {
  if (ctx.device && ctx.device.fingerprint) {
    return ctx.device.fingerprint;
  }

  return ctx.ip + ' @@ ' + ctx.device.fingerprint;
};

export default (options: IOptions): Middleware => {
  options.seconds = options.seconds || 60;
  options.requests = options.requests || 20;

  return rateLimit({
    duration: options.seconds * 1000,
    max: options.requests,
    id: getClientFingerprint,
    throw: true,

    driver: 'redis',
    db: RedisService.getInstance(),
    disableHeader: false,
  });
};
