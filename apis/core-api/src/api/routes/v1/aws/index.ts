import Router from 'koa-router';

import s3 from './s3';

const router = new Router({
  prefix: '/aws',
});

router.use(s3.routes());

export default router;
