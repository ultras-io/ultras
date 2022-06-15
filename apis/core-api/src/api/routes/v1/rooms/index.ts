import Router from 'koa-router';
import checkUserAuth from 'api/middlewares/check-user-auth';
import ControllerAdapter from './ControllerAdapter';

const router = new Router({
  prefix: '/rooms',
});

router.post('/', checkUserAuth(), ControllerAdapter.create);
// router.get('/', ControllerAdapter.getAll);
// router.get('/:id', ControllerAdapter.getById);
// router.put('/:id', checkUserAuth(), ControllerAdapter.update);
// router.delete('/:id', checkUserAuth(), ControllerAdapter.delete);

export default router;
