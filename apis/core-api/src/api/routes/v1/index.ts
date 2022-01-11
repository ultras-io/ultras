import Router from 'koa-router';

import countries from './countries';
import cities from './cities';
import venues from './venues';
import teams from './teams';
import leagues from './leagues';

const router = new Router({
  prefix: '/v1',
});

router.use(countries.routes());
router.use(cities.routes());
router.use(venues.routes());
router.use(teams.routes());
router.use(leagues.routes());

export default router;
