import Router from 'koa-router';
import parseAuthToken from 'api/middlewares/parse-auth-token';
import checkUserAuth from 'api/middlewares/check-user-auth';
import ControllerAdapter from './ControllerAdapter';

const auth = [parseAuthToken(), checkUserAuth()];

const router = new Router({
  prefix: '/:id/comments',
});

router.post('/', ...auth, ControllerAdapter.create);
router.put('/:commentId', ...auth, ControllerAdapter.update);
router.delete('/:commentId', ...auth, ControllerAdapter.delete);
router.get('/', parseAuthToken(), ControllerAdapter.getAll);

export default router;
