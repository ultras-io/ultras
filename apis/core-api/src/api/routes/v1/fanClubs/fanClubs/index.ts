import Router from 'koa-router';
import checkUserAuth from 'api/middlewares/check-user-auth';
import checkFanClubExistence from 'api/middlewares/check-fan-club-existence';
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
router.get('/', ControllerAdapter.getAll);
router.get(`/:${idKey}`, checkFanClubExistence(idKey), ControllerAdapter.getById);

export default router;