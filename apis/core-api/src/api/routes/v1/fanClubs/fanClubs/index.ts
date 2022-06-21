import Router from 'koa-router';
import checkUserAuth from 'api/middlewares/check-user-auth';
import checkFanClubExistence from '../middlewares/checkFanClubExistence';
import ControllerAdapter from './ControllerAdapter';

const idKey = 'fanClubId';
const router = new Router({
  prefix: '',
});

router.post('/', checkUserAuth(), ControllerAdapter.create);
router.patch(
  `/:${idKey}`,
  checkUserAuth(),
  checkFanClubExistence(idKey),
  ControllerAdapter.update
);
router.get('/', checkUserAuth(), ControllerAdapter.getAll);
router.get(
  `/:${idKey}`,
  checkUserAuth(),
  checkFanClubExistence(idKey),
  ControllerAdapter.getById
);

export default router;
