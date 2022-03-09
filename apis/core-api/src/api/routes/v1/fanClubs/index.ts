import Router from 'koa-router';
import routeMembershipAdmin from './admin';
import routeMembershipFanClubs from './fanClubs';

const router = new Router({
  prefix: '/fan-clubs',
});

router.use(routeMembershipAdmin.routes());
router.use(routeMembershipFanClubs.routes());

export default router;
