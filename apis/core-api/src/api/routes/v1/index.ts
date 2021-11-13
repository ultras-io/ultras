import Router from 'koa-router';

import countries from './countries';

const router = new Router({
  prefix: '/v1',
});

router.use(countries.routes());

export default router;
