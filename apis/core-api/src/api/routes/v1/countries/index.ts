import Router from 'koa-router';
import ControllerAdapter from 'api/routes/v1/nationalTeams/ControllerAdapter';

const router = new Router({
  prefix: '/national-teams',
});

router.get('/', ControllerAdapter.getAll);

export default router;
