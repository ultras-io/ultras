import { FanClubMemberRoleEnum, FanClubMemberStatusEnum } from '@ultras/utils';
import Router from 'koa-router';
import checkUserAuth from 'api/middlewares/check-user-auth';
import checkFanClubExistence from 'api/middlewares/check-fan-club-existence';
import checkFanClubRole from 'api/middlewares/check-fan-club-role';
import checkFanClubStatus from 'api/middlewares/check-fan-club-status';
import ControllerAdapter from './ControllerAdapter';

const idKey = 'fanClubId';
const router = new Router({
  prefix: `/:${idKey}/memberships`,
});

const middlewares = [
  checkUserAuth(),
  checkFanClubExistence(idKey),
  checkFanClubRole([FanClubMemberRoleEnum.owner, FanClubMemberRoleEnum.admin], idKey),
  checkFanClubStatus([FanClubMemberStatusEnum.active], idKey),
];

// router.use(...middlewares);
router.post('/invite-member', ...middlewares, ControllerAdapter.invite);
router.delete('/', ...middlewares, ControllerAdapter.remove);
router.delete('/:id', ...middlewares, ControllerAdapter.removeById);
router.get('/', ...middlewares, ControllerAdapter.getAll);
router.get('/:id', ...middlewares, ControllerAdapter.getById);
router.patch('/', ...middlewares, ControllerAdapter.update);
router.patch('/:id', ...middlewares, ControllerAdapter.updateById);

export default router;
