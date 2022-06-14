import Router from 'koa-router';
import checkUserAuth from 'api/middlewares/check-user-auth';
import ControllerAdapter from './ControllerAdapter';
import hasEventAccess from '../middlewares/hasEventAccess';

const router = new Router({
  prefix: '/:id/members',
});

router.post('/', checkUserAuth(), hasEventAccess(), ControllerAdapter.create);
router.get('/', checkUserAuth(), hasEventAccess(), ControllerAdapter.getAll);
router.delete('/', checkUserAuth(), hasEventAccess(), ControllerAdapter.delete);

export default router;
