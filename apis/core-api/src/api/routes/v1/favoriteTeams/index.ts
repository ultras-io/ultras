import Router from 'koa-router';
import parseAuthToken from 'api/middlewares/parse-auth-token';
import checkUserAuth from 'api/middlewares/check-user-auth';
import ControllerAdapter from './ControllerAdapter';

const auth = [parseAuthToken(), checkUserAuth()];

const router = new Router({
  prefix: '/favorite-teams',
});

router.get('/', ...auth, ControllerAdapter.getAll);
router.get('/:id', ...auth, ControllerAdapter.getById);
router.post('/', ...auth, ControllerAdapter.add);
router.delete('/:id', ...auth, ControllerAdapter.remove);
router.delete('/teams/:id', ...auth, ControllerAdapter.removeByTeamId);

export default router;
