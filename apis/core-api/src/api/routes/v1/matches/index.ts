import Router from 'koa-router';
import ControllerAdapter from './ControllerAdapter';

import likes from './likes';

const router = new Router({
  prefix: '/matches',
});

router.get('/', ControllerAdapter.getAll);
router.post('/inject/:date', ControllerAdapter.inject);
router.get('/:id', ControllerAdapter.getById);

router.use(likes.routes());

export default router;
