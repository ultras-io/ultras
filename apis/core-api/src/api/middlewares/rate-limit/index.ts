import Redis from 'ioredis';
import rateLimit from 'koa-ratelimit';
import { Middleware } from 'koa';
import { Context } from 'types';

interface OptionsInterface {
  seconds: number;
  requests: number;
}

const getClientFingerprint = (ctx: Context): string => {
  console.log(ctx);
  return ctx.ip;
};

export default ({ seconds = 60, requests = 20 }: OptionsInterface): Middleware => {
  return rateLimit({
    duration: seconds * 1000,
    max: requests,
    id: getClientFingerprint,
    throw: true,

    driver: 'redis',
    db: new Redis(),
    disableHeader: false,
  });
};
