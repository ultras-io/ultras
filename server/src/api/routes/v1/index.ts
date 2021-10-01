import Router from 'koa-router';

/*
const userRoutes = require('./users');
const topicRoutes = require('./topics');
const awsRoutes = require('./aws');
*/

const router = new Router({
  prefix: '/v1',
});

/*
router.use(userRoutes.routes());
router.use(topicRoutes.routes());
router.use(awsRoutes.routes());
*/

export default router;
