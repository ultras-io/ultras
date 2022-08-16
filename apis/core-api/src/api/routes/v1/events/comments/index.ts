import Router from 'koa-router';
import parseAuthToken from 'api/middlewares/parse-auth-token';
import checkUserAuth from 'api/middlewares/check-user-auth';
import ControllerAdapter from './ControllerAdapter';
import hasEventAccess from '../middlewares/hasEventAccess';

const auth = [parseAuthToken(), checkUserAuth()];

const router = new Router({
  prefix: '/:id/comments',
});

router.post('/', ...auth, hasEventAccess(), ControllerAdapter.create);
router.put('/:commentId', ...auth, hasEventAccess(), ControllerAdapter.update);
router.delete('/:commentId', ...auth, hasEventAccess(), ControllerAdapter.delete);
router.get('/', parseAuthToken(), hasEventAccess(), ControllerAdapter.getAll);

export default router;
