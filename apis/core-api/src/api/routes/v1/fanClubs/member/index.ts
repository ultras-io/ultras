import { FanClubMemberRoleEnum, FanClubMemberStatusEnum } from '@ultras/utils';
import Router from 'koa-router';
import parseAuthToken from 'api/middlewares/parse-auth-token';
import checkUserAuth from 'api/middlewares/check-user-auth';
import validateFanClubMembership from '../middlewares/validateFanClubMembership';
import ControllerAdapter from './ControllerAdapter';

const auth = [parseAuthToken(), checkUserAuth()];

// #region - with fan club id routes
// build router that contains fan club id
const idKey = 'fanClubId';
const routerWithFanClubId = new Router({
  prefix: `/:${idKey}/memberships`,
});

routerWithFanClubId.post('/join', ...auth, ControllerAdapter.requestJoin);
routerWithFanClubId.delete('/leave', ...auth, ControllerAdapter.leave);
routerWithFanClubId.delete(
  '/:id/leave',
  ...auth,
  validateFanClubMembership(
    {
      roles: [FanClubMemberRoleEnum.admin, FanClubMemberRoleEnum.member],
    },
    idKey
  ),
  ControllerAdapter.leave
);

// add middleware that checks member roles and pending status
const middlewaresWithFanClubIdAndChecks = [
  ...auth,
  validateFanClubMembership(
    {
      roles: [FanClubMemberRoleEnum.admin, FanClubMemberRoleEnum.member],
      statuses: [FanClubMemberStatusEnum.pendingInvitation],
    },
    idKey
  ),
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
routerWithFanClubId.patch(
  '/accept-invitation',
  ...middlewaresWithFanClubIdAndChecks,
  ControllerAdapter.acceptInvitation
);
routerWithFanClubId.patch(
  '/reject-invitation',
  ...middlewaresWithFanClubIdAndChecks,
  ControllerAdapter.rejectInvitation
);
// #endregion

// #region - without fan club id routes
// build router that doesn't contains fan club id
const routerWithoutFanClubId = new Router({
  prefix: '/memberships',
});

routerWithoutFanClubId.post('/join', ...auth, ControllerAdapter.requestJoin);
routerWithoutFanClubId.get('/', ...auth, ControllerAdapter.getAll);
// #endregion

// build new router that requires authenticated user, then
// append routes with/without fan club id
const router = new Router();
router.use(routerWithoutFanClubId.routes());
router.use(routerWithFanClubId.routes());

export default router;
