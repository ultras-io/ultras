import Router from 'koa-router';

import countries from './countries';
import cities from './cities';
import venues from './venues';
import teams from './teams';

const router = new Router({
  prefix: '/v1',
});

router.use(countries.routes());
router.use(cities.routes());
router.use(venues.routes());
router.use(teams.routes());

export default router;
