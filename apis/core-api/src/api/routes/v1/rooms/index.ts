import Router from 'koa-router';
import checkUserAuth from 'api/middlewares/check-user-auth';
import ControllerAdapter from './ControllerAdapter';
import members from './members';
import hasEventAccess from './middlewares/hasEventAccess';

const router = new Router({
  prefix: '/rooms',
});

router.post('/', checkUserAuth(), ControllerAdapter.create);
router.get('/', ControllerAdapter.getAll);
router.get('/:id', checkUserAuth(), hasEventAccess(), ControllerAdapter.getById);
router.put('/:id', checkUserAuth(), hasEventAccess(), ControllerAdapter.update);
router.delete('/:id', checkUserAuth(), hasEventAccess(), ControllerAdapter.delete);

router.use(members.routes());

export default router;
