import Router from 'koa-router';
import parseAuthToken from 'api/middlewares/parse-auth-token';
import checkUserAuth from 'api/middlewares/check-user-auth';
import ControllerAdapter from './ControllerAdapter';
import hasRoomAccess from '../middlewares/hasRoomAccess';

const auth = [parseAuthToken(), checkUserAuth()];

const router = new Router({
  prefix: '/:id/catches',
});

router.post('/', ...auth, hasRoomAccess(), ControllerAdapter.create);
router.delete('/', ...auth, hasRoomAccess(), ControllerAdapter.delete);
router.get('/', parseAuthToken(), hasRoomAccess(), ControllerAdapter.getAll);

export default router;
