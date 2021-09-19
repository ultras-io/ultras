import Router from 'koa-router';
import { Context, KoaApp } from 'types';

import v1Routes from './v1';

const router = new Router();

router.get('/ping', async (ctx: Context) => ctx.ok('pong v1'));
router.get('/versions', async (ctx: Context) => ctx.ok(['v1']));
router.get('/versions/current', async (ctx: Context) => ctx.ok('v1'));

router.use(v1Routes.routes());

export default (app: KoaApp): void => {
  app.use(router.routes());
  app.use(router.allowedMethods());
};
