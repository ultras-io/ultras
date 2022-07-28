import Router from 'koa-router';
import checkUserAuth from 'api/middlewares/check-user-auth';
import ControllerAdapter from './ControllerAdapter';
import members from './members';
import hasRoomAccess from './middlewares/hasRoomAccess';

const router = new Router({
  prefix: '/rooms',
});

router.post('/', checkUserAuth(), ControllerAdapter.create);
router.get('/', checkUserAuth(),ControllerAdapter.getAll);
router.get('/:id', checkUserAuth(), hasRoomAccess(), ControllerAdapter.getById);
router.put('/:id', checkUserAuth(), hasRoomAccess(true), ControllerAdapter.update);
router.delete('/:id', checkUserAuth(), hasRoomAccess(true), ControllerAdapter.delete);

router.use(members.routes());

export default router;
