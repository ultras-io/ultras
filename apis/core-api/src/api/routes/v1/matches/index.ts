import Router from 'koa-router';
import ControllerAdapter from './ControllerAdapter';

import catches from './catches';
import comments from './comments';

const router = new Router({
  prefix: '/matches',
});

router.get('/', ControllerAdapter.getAll);
router.post('/inject/date/:date', ControllerAdapter.injectByDate);
router.post('/inject/season/:season', ControllerAdapter.injectBySeason);
router.get('/:id', ControllerAdapter.getById);

router.use(catches.routes());
router.use(comments.routes());

export default router;
