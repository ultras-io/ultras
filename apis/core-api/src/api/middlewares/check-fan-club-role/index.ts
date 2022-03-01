import { Middleware, Next as KoaNext } from 'koa';
import { Context } from 'types';
import { FanClubMemberRoleEnum, FanClubMemberErrorEnum } from '@ultras/utils';
import { FanClubService } from 'core/services';
import { AccessDeniedError } from 'modules/exceptions';

export default (
  roles: FanClubMemberRoleEnum | Array<FanClubMemberRoleEnum>
): Middleware => {
  return async (ctx: Context, next: KoaNext) => {
    if (!Array.isArray(roles)) {
      roles = [roles];
    }

    const fanClubId = ctx.request.params.id;
    const hasRole = await FanClubService.isMemberHasRole(
      fanClubId,
      ctx.user.userId,
      roles
    );

    if (!hasRole) {
      throw new AccessDeniedError({
        errorCode: FanClubMemberErrorEnum.permissionDenied,
        message: "You don't have a valid role to complete this action.",
        allowed: roles,
      });
    }

    return next();
  };
};
