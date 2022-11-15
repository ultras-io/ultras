import Router from 'koa-router';
import parseAuthToken from 'api/middlewares/parse-auth-token';
import checkUserAuth from 'api/middlewares/check-user-auth';
import ControllerAdapter from './ControllerAdapter';
import hasRoomAccess from './middlewares/hasRoomAccess';

import members from './members';
import catches from './catches';
import comments from './comments';

const auth = [parseAuthToken(), checkUserAuth()];

const router = new Router({
  prefix: '/rooms',
});

router.post('/', ...auth, ControllerAdapter.create);
router.get('/', parseAuthToken(), ControllerAdapter.getAll);
router.get('/:id', parseAuthToken(), hasRoomAccess(), ControllerAdapter.getById);
router.put('/:id', ...auth, hasRoomAccess(true), ControllerAdapter.update);
router.delete('/:id', ...auth, hasRoomAccess(true), ControllerAdapter.delete);

router.use(members.routes());
router.use(catches.routes());
router.use(comments.routes());

export default router;
