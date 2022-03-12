import Router from 'koa-router';
import routeMembershipMember from './member';
import routeMembershipAdmin from './admin';
import routeMembershipFanClubs from './fanClubs';

const router = new Router({
  prefix: '/fan-clubs',
});

router.use(routeMembershipMember.routes());
router.use(routeMembershipAdmin.routes());
router.use(routeMembershipFanClubs.routes());

export default router;
