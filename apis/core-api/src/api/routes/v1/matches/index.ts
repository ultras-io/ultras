import Router from 'koa-router';
import parseAuthToken from 'api/middlewares/parse-auth-token';
import ControllerAdapter from './ControllerAdapter';

import catches from './catches';
import comments from './comments';

const router = new Router({
  prefix: '/matches',
});

router.post('/inject/date/:date', ControllerAdapter.injectByDate);
router.post('/inject/season/:season', ControllerAdapter.injectBySeason);
router.get('/', parseAuthToken(), ControllerAdapter.getAll);
router.get('/:id', parseAuthToken(), ControllerAdapter.getById);

router.use(catches.routes());
router.use(comments.routes());

export default router;
