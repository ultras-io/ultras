import Router from 'koa-router';
import checkUserAuth from 'api/middlewares/check-user-auth';
import rateLimit from 'api/middlewares/rate-limit';
import ControllerAdapter from './ControllerAdapter';

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

router.delete(
  '/revoke-token',
  checkUserAuth({
    regenerateOnExpire: false,
  }),
  ControllerAdapter.revokeToken
);

router.get('/me', checkUserAuth(), ControllerAdapter.getMe);
router.get('/profile/:id', checkUserAuth(), ControllerAdapter.getProfile);

export default router;
