import { Middleware, Next as KoaNext } from 'koa';
import { Context } from 'types';
import { FanClubMemberRoleEnum, FanClubMemberErrorEnum } from '@ultras/utils';
import { FanClubMemberService } from 'core/services';
import { AccessDeniedError } from 'modules/exceptions';

export default (
  roles: FanClubMemberRoleEnum | Array<FanClubMemberRoleEnum>,
  routeIdParamName = 'id'
): Middleware => {
  return async (ctx: Context, next: KoaNext) => {
    if (!Array.isArray(roles)) {
      roles = [roles];
    }

    const fanClubId = ctx.request.params[routeIdParamName];

    const hasRole = await FanClubMemberService.isHasRole(
      fanClubId,
      ctx.user.userId,
      roles
    );

    if (!hasRole) {
      throw new AccessDeniedError({
        errorCode: FanClubMemberErrorEnum.permissionDenied,
        message: 'You have not permission.',
        allowed: roles,
      });
    }

    return next();
  };
};
