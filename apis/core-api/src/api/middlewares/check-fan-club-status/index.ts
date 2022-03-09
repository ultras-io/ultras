import { Middleware, Next as KoaNext } from 'koa';
import { Context } from 'types';
import { FanClubMemberStatusEnum, FanClubMemberErrorEnum } from '@ultras/utils';
import { FanClubMemberService } from 'core/services';
import { AccessDeniedError } from 'modules/exceptions';

export default (
  statuses: FanClubMemberStatusEnum | Array<FanClubMemberStatusEnum>,
  routeIdParamName = 'id'
): Middleware => {
  return async (ctx: Context, next: KoaNext) => {
    if (!Array.isArray(statuses)) {
      statuses = [statuses];
    }

    const fanClubId = ctx.request.params[routeIdParamName];
    const hasStatus = await FanClubMemberService.isHasStatus(
      fanClubId,
      ctx.user.userId,
      statuses
    );

    if (!hasStatus) {
      throw new AccessDeniedError({
        errorCode: FanClubMemberErrorEnum.memberNotActive,
        message: "You don't have a valid status to complete this action.",
        allowed: statuses,
      });
    }

    return next();
  };
};
