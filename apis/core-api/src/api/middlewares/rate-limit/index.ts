import { Middleware } from 'koa';
import rateLimit from 'koa-ratelimit';
import Redis from 'ioredis';
import { Context } from 'types';

interface OptionsInterface {
  seconds: number;
  requests: number;
}

const getClientFingerprint = (ctx: Context): string => {
  if (ctx.device && ctx.device.fingerprint) {
    return ctx.device.fingerprint;
  }

  return ctx.ip + ' @@ ' + ctx.device.fingerprint;
};

export default (options: OptionsInterface): Middleware => {
  options.seconds = options.seconds || 60;
  options.requests = options.requests || 20;

  return rateLimit({
    duration: options.seconds * 1000,
    max: options.requests,
    id: getClientFingerprint,
    throw: true,

    driver: 'redis',
    db: new Redis(),
    disableHeader: false,
  });
};
