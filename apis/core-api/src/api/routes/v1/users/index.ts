import Router from 'koa-router';
import rateLimit from 'api/middlewares/rate-limit';
import ControllerAdapter from './ControllerAdapter';

const router = new Router({
  prefix: '/users',
});

router.get('/check-username', ControllerAdapter.checkUsernameExists);

router.post(
  '/identity-confirm',
  rateLimit({ seconds: 60, requests: 1 }),
  ControllerAdapter.confirmUserIdentity
);

router.post('/verify-code', ControllerAdapter.verifyCode);
router.post('/register', ControllerAdapter.registerUser);

export default router;
