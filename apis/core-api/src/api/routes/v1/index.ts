import Router from 'koa-router';

import countries from './countries';
import cities from './cities';
import venues from './venues';
import teams from './teams';
import leagues from './leagues';
import matches from './matches';
import users from './users';
import fanClubs from './fanClubs';
import favoriteTeams from './favoriteTeams';
import events from './events';
import rooms from './rooms';
import aws from './aws';

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
router.use(favoriteTeams.routes());
router.use(events.routes());
router.use(rooms.routes());
router.use(aws.routes());

export default router;
