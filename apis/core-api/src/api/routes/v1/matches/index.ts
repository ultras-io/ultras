import Router from 'koa-router';
import ControllerAdapter from './ControllerAdapter';

const router = new Router({
  prefix: '/matches',
});

router.get('/', ControllerAdapter.getAll);
router.post('/inject/:date', ControllerAdapter.inject);

router.get('/:id', ControllerAdapter.getById);

export default router;
