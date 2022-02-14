import Router from 'koa-router';
import checkUserAuth from 'api/middlewares/check-user-auth';
import ControllerAdapter from './ControllerAdapter';

const router = new Router({
  prefix: '/fan-clubs',
});

router.post('/', checkUserAuth(), ControllerAdapter.create);
router.patch('/:id', checkUserAuth(), ControllerAdapter.update);
router.get('/', ControllerAdapter.getAll);
router.get('/:id', ControllerAdapter.getById);

export default router;
