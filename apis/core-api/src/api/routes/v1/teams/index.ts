import Router from 'koa-router';
import ControllerAdapter from './ControllerAdapter';

const router = new Router({
  prefix: '/teams',
});

router.get('/', ControllerAdapter.getAll);
router.post('/inject', ControllerAdapter.inject);

router.get('/:id', ControllerAdapter.getById);

export default router;
