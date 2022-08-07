import Router from 'koa-router';
import parseAuthToken from 'api/middlewares/parse-auth-token';
import checkUserAuth from 'api/middlewares/check-user-auth';
import ControllerAdapter from './ControllerAdapter';

const auth = [parseAuthToken(), checkUserAuth()];

const router = new Router({
  prefix: '/:id/likes',
});

router.post('/', ...auth, ControllerAdapter.create);
router.delete('/', ...auth, ControllerAdapter.delete);
router.get('/', parseAuthToken(), ControllerAdapter.getAll);

export default router;
