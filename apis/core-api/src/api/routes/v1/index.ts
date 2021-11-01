import Router from 'koa-router';

import nationalTeams from './nationalTeams';

const router = new Router({
  prefix: '/v1',
});

router.use(nationalTeams.routes());

export default router;
