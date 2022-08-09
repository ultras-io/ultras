import Router from 'koa-router';
import ControllerAdapter from './ControllerAdapter';

import likes from './likes';
import comments from './comments';

const router = new Router({
  prefix: '/matches',
});

router.get('/', ControllerAdapter.getAll);
router.post('/inject/:date', ControllerAdapter.inject);
router.get('/:id', ControllerAdapter.getById);

router.use(likes.routes());
router.use(comments.routes());

export default router;
