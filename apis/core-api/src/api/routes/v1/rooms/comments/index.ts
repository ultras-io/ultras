import Router from 'koa-router';
import parseAuthToken from 'api/middlewares/parse-auth-token';
import checkUserAuth from 'api/middlewares/check-user-auth';
import ControllerAdapter from './ControllerAdapter';
import hasRoomAccess from '../middlewares/hasRoomAccess';

const auth = [parseAuthToken(), checkUserAuth()];

const router = new Router({
  prefix: '/:id/comments',
});

router.post('/', ...auth, hasRoomAccess(), ControllerAdapter.create);
router.put('/:commentId', ...auth, hasRoomAccess(), ControllerAdapter.update);
router.delete('/:commentId', ...auth, hasRoomAccess(), ControllerAdapter.delete);
router.get('/', parseAuthToken(), hasRoomAccess(), ControllerAdapter.getAll);

export default router;
