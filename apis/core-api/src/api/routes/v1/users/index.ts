import Router from 'koa-router';
import authToken from 'api/middlewares/auth-token';
import rateLimit from 'api/middlewares/rate-limit';
import ControllerAdapter from './ControllerAdapter';
import { Context } from 'types';

const router = new Router({
  prefix: '/users',
});

router.get('/check-username-existence', ControllerAdapter.checkUsernameExistence);

router.post(
  '/identity-confirm',
  rateLimit({ seconds: 60, requests: 3 }),
  ControllerAdapter.confirmUserIdentity
);

router.post('/verify-code', ControllerAdapter.verifyCode);
router.post('/register', ControllerAdapter.register);
router.post('/login', ControllerAdapter.login);

router.get('/token', ControllerAdapter.getTokenInfo);

export default router;
