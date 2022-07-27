import Router from 'koa-router';
import parseAuthToken from 'api/middlewares/parse-auth-token';
import checkUserAuth from 'api/middlewares/check-user-auth';
import ControllerAdapter from './ControllerAdapter';
import hasEventAccess from '../middlewares/hasEventAccess';

const middleware = [parseAuthToken(), checkUserAuth(), hasEventAccess()];

const router = new Router({
  prefix: '/:id/members',
});

router.post('/', ...middleware, ControllerAdapter.create);
router.get('/', ...middleware, ControllerAdapter.getAll);
router.delete('/', ...middleware, ControllerAdapter.delete);

export default router;
