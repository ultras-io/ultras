import { FanClubMemberRoleEnum, FanClubMemberStatusEnum } from '@ultras/utils';
import Router from 'koa-router';
import checkUserAuth from 'api/middlewares/check-user-auth';
import validateFanClubMembership from '../middlewares/validateFanClubMembership';
import ControllerAdapter from './ControllerAdapter';

const idKey = 'fanClubId';
const router = new Router({
  prefix: `/:${idKey}/memberships`,
});

const middlewares = [
  checkUserAuth(),
  validateFanClubMembership(
    {
      roles: [FanClubMemberRoleEnum.owner, FanClubMemberRoleEnum.admin],
      statuses: [FanClubMemberStatusEnum.active],
    },
    idKey
  ),
];

// router.use(...middlewares);
router.post('/invite-member', ...middlewares, ControllerAdapter.invite);
router.delete('/', ...middlewares, ControllerAdapter.remove);
router.delete('/:id', ...middlewares, ControllerAdapter.removeById);
router.get('/', checkUserAuth(), ControllerAdapter.getAll);
router.get('/:id', ...middlewares, ControllerAdapter.getById);
router.patch('/', ...middlewares, ControllerAdapter.update);
router.patch('/:id', ...middlewares, ControllerAdapter.updateById);
router.patch('/:id/accept-request', ...middlewares, ControllerAdapter.acceptRequest);
router.patch('/:id/reject-request', ...middlewares, ControllerAdapter.rejectRequest);

export default router;
