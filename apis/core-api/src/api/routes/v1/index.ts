import Router from 'koa-router';

import countries from './countries';
import cities from './cities';

const router = new Router({
  prefix: '/v1',
});

router.use(countries.routes());
router.use(cities.routes());
export default router;
