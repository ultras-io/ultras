import Router from 'koa-router';
import checkUserAuth from 'api/middlewares/check-user-auth';
import ControllerAdapter from './ControllerAdapter';

const router = new Router({
  prefix: '/favorite-teams',
});

router.get('/', checkUserAuth(), ControllerAdapter.getAll);
router.get('/:id', checkUserAuth(), ControllerAdapter.getById);
router.post('/', checkUserAuth(), ControllerAdapter.add);
router.delete('/:id', checkUserAuth(), ControllerAdapter.remove);
router.delete('/teams/:id', checkUserAuth(), ControllerAdapter.removeByTeamId);

export default router;
