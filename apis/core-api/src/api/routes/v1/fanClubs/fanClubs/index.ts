import Router from 'koa-router';
import parseAuthToken from 'api/middlewares/parse-auth-token';
import checkUserAuth from 'api/middlewares/check-user-auth';
import checkFanClubExistence from '../middlewares/checkFanClubExistence';
import ControllerAdapter from './ControllerAdapter';

const auth = [parseAuthToken(), checkUserAuth()];

const idKey = 'fanClubId';
const router = new Router({
  prefix: '',
});

router.post('/', ...auth, ControllerAdapter.create);
router.patch(
  `/:${idKey}`,
  ...auth,
  checkFanClubExistence(idKey),
  ControllerAdapter.update
);
router.get('/', parseAuthToken(), ControllerAdapter.getAll);
router.get(
  `/:${idKey}`,
  parseAuthToken(),
  checkFanClubExistence(idKey),
  ControllerAdapter.getById
);

export default router;
