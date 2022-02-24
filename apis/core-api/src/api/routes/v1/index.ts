import Router from 'koa-router';

import countries from './countries';
import cities from './cities';
import venues from './venues';
import teams from './teams';
import leagues from './leagues';
import matches from './matches';
import users from './users';
import fanClubs from './fanClubs';
import awsS3 from './awsS3';

const router = new Router({
  prefix: '/v1',
});

router.use(countries.routes());
router.use(cities.routes());
router.use(venues.routes());
router.use(teams.routes());
router.use(leagues.routes());
router.use(matches.routes());
router.use(users.routes());
router.use(fanClubs.routes());
router.use(awsS3.routes());

export default router;
