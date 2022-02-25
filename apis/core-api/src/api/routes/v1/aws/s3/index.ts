import Router from 'koa-router';
import ControllerAdapter from './ControllerAdapter';

const router = new Router({
  prefix: '/s3',
});

router.get('/signed-url', ControllerAdapter.getSignedUrl);

export default router;
