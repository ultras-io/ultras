import { FanClubMemberRoleEnum, FanClubMemberStatusEnum } from '@ultras/utils';
import Router from 'koa-router';
import checkUserAuth from 'api/middlewares/check-user-auth';
import checkFanClubExistence from 'api/middlewares/check-fan-club-existence';
import checkFanClubRole from 'api/middlewares/check-fan-club-role';
import checkFanClubStatus from 'api/middlewares/check-fan-club-status';
import ControllerAdapter from './ControllerAdapter';

// #region - with fan club id routes
// build router that contains fan club id
const idKey = 'fanClubId';
const routerWithFanClubId = new Router({
  prefix: `/:${idKey}/memberships`,
});

const middlewaresWithFanClubId = [checkUserAuth(), checkFanClubExistence(idKey)];

routerWithFanClubId.post(
  '/join',
  ...middlewaresWithFanClubId,
  ControllerAdapter.requestJoin
);
routerWithFanClubId.delete(
  '/:id/leave',
  ...middlewaresWithFanClubId,
  checkFanClubRole([FanClubMemberRoleEnum.admin, FanClubMemberRoleEnum.member], idKey),
  ControllerAdapter.leave
);

// add middleware that checks member roles and pending status
const middlewaresWithFanClubIdAndChecks = [
  ...middlewaresWithFanClubId,
  checkFanClubRole([FanClubMemberRoleEnum.admin, FanClubMemberRoleEnum.member], idKey),
  checkFanClubStatus([FanClubMemberStatusEnum.pendingInvitation], idKey),
];

routerWithFanClubId.patch(
  '/:id/accept-invitation',
  ...middlewaresWithFanClubIdAndChecks,
  ControllerAdapter.acceptInvitation
);
routerWithFanClubId.patch(
  '/:id/reject-invitation',
  ...middlewaresWithFanClubIdAndChecks,
  ControllerAdapter.rejectInvitation
);
// #endregion

// #region - without fan club id routes
// build router that doesn't contains fan club id
const routerWithoutFanClubId = new Router({
  prefix: '/memberships',
});

const middlewaresWithoutFanClubId = [checkUserAuth()];
// routerWithoutFanClubId.use(...middlewaresWithoutFanClubId);

routerWithoutFanClubId.post(
  '/join',
  ...middlewaresWithoutFanClubId,
  ControllerAdapter.requestJoin
);
routerWithoutFanClubId.get('/', ...middlewaresWithoutFanClubId, ControllerAdapter.getAll);
// #endregion

// build new router that requires authenticated user, then
// append routes with/without fan club id
const router = new Router();
router.use(routerWithoutFanClubId.routes());
router.use(routerWithFanClubId.routes());

export default router;
