import {
  FanClubMemberStatusEnum,
  FanClubMemberErrorEnum,
  FanClubMemberRoleEnum,
} from '@ultras/utils';
import { Middleware, Next as KoaNext } from 'koa';
import { Context } from 'types';
import { FanClubMemberService, FanClubService } from 'core/services';
import { AccessDeniedError, ResourceNotFoundError } from 'modules/exceptions';

interface IValidation {
  statuses?: FanClubMemberStatusEnum | Array<FanClubMemberStatusEnum>;
  roles?: FanClubMemberRoleEnum | Array<FanClubMemberRoleEnum>;
}

export default (validation: IValidation, routeIdParamName = 'id'): Middleware => {
  return async (ctx: Context, next: KoaNext) => {
    const fanClubId = ctx.request.params[routeIdParamName];
    const fanClub = await FanClubService.getById(fanClubId);

    // validate fan club exists
    if (!fanClub) {
      throw new ResourceNotFoundError({
        message: 'Fan club not found.',
      });
    }

    // get membership by fan club id and member id
    const memberId = ctx.user?.userId;
    if (!memberId) {
      throw new ResourceNotFoundError({
        message: 'Fan club membership not found.',
      });
    }

    const membership = await FanClubMemberService.getOne(fanClubId, memberId);
    if (!membership) {
      throw new ResourceNotFoundError({
        message: 'Fan club membership not found.',
      });
    }

    // check fan club member has one of provided statuses.
    if (validation.statuses) {
      const statuses = Array.isArray(validation.statuses)
        ? validation.statuses
        : [validation.statuses];

      const status = membership.getDataValue('status');
      if (!statuses.includes(status)) {
        throw new AccessDeniedError({
          errorCode: FanClubMemberErrorEnum.memberNotActive,
          message: "You don't have a valid status to complete this action.",
          allowed: statuses,
        });
      }
    }

    // check fan club member has one of provided roles.
    if (validation.roles) {
      const roles = Array.isArray(validation.roles)
        ? validation.roles
        : [validation.roles];

      const role = membership.getDataValue('fanClubMemberRole');
      const roleName = role.getDataValue('role');

      if (!roles.includes(roleName)) {
        throw new AccessDeniedError({
          errorCode: FanClubMemberErrorEnum.permissionDenied,
          message: 'You have not permission.',
          allowed: roles,
        });
      }
    }

    return next();
  };
};
