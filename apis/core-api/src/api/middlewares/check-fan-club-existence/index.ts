import { Middleware, Next as KoaNext } from 'koa';
import { Context } from 'types';
import { FanClubMemberErrorEnum } from '@ultras/utils';
import { FanClubService } from 'core/services';
import { ResourceNotFoundError } from 'modules/exceptions';

export default (routeIdParamName = 'id'): Middleware => {
  return async (ctx: Context, next: KoaNext) => {
    const fanClubId = ctx.request.params[routeIdParamName];
    let fanClubExists = null;

    if (fanClubId) {
      fanClubExists = await FanClubService.exists(fanClubId);
    }

    if (!fanClubExists) {
      throw new ResourceNotFoundError({
        errorCode: FanClubMemberErrorEnum.notFound,
        message: 'Fan club not found.',
      });
    }

    return next();
  };
};
