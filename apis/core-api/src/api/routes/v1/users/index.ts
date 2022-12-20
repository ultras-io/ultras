import Router from 'koa-router';
import parseAuthToken from 'api/middlewares/parse-auth-token';
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
  parseAuthToken({ regenerateOnExpire: false }),
  checkUserAuth(),
  ControllerAdapter.revokeToken
);

router.get('/me', parseAuthToken(), checkUserAuth(), ControllerAdapter.getMe);
router.put('/me', parseAuthToken(), checkUserAuth(), ControllerAdapter.updateProfile);
router.get('/profile/:id', ControllerAdapter.getProfile);

export default router;
