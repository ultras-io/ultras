import Router from 'koa-router';
import ControllerAdapter from 'api/routes/v1/venues/ControllerAdapter';

const router = new Router({
  prefix: '/venues',
});

router.get('/', ControllerAdapter.getAll);
router.post('/inject', ControllerAdapter.inject);

router.get('/:id', ControllerAdapter.getById);

export default router;
