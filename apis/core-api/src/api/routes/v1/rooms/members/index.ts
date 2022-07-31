import Router from 'koa-router';
import checkUserAuth from 'api/middlewares/check-user-auth';
import ControllerAdapter from './ControllerAdapter';
import hasRoomAccess from '../middlewares/hasRoomAccess';

const router = new Router({
  prefix: '/:id/members',
});

router.post('/', checkUserAuth(), hasRoomAccess(), ControllerAdapter.create);
router.get('/', checkUserAuth(), hasRoomAccess(), ControllerAdapter.getAll);
router.delete('/', checkUserAuth(), hasRoomAccess(), ControllerAdapter.delete);

export default router;
