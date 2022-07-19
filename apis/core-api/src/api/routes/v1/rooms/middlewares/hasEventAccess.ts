import { FanClubMemberRoleEnum, RoomPrivacyEnum } from '@ultras/utils';
import { Middleware, Next as KoaNext } from 'koa';
import { Context } from 'types';
import {
  RoomService,
  PostService,
  FanClubMemberService,
  FanClubService,
} from 'core/services';
import { AccessDeniedError, ResourceNotFoundError } from 'modules/exceptions';

const errorNotFound = () => {
  throw new ResourceNotFoundError({
    message: 'Room not found.',
  });
};

const errorAccessDenied = () => {
  throw new AccessDeniedError({
    message: "You don't have access to this room.",
  });
};

const getFanClubMemberInfo = async (
  fanClubId: ResourceIdentifier,
  memberId: ResourceIdentifier
) => {
  if (!fanClubId) {
    return null;
  }

  const fanClub = await FanClubService.getById(fanClubId);
  if (!fanClub) {
    return null;
  }

  const fanClubMember = await FanClubMemberService.getOne(fanClubId, memberId);
  return fanClubMember;
};

const isFanClubAdmin = (role: FanClubMemberRoleEnum): boolean => {
  return role == FanClubMemberRoleEnum.admin || role == FanClubMemberRoleEnum.owner;
};

export default (restrictedAction = false): Middleware => {
  return async (ctx: Context, next: KoaNext) => {
    const roomId = ctx.request.params.id;
    const userId = ctx.user.userId;

    const room = await RoomService.getById(roomId, false);
    if (!room) {
      errorNotFound();
    }

    const post = await PostService.getById(room.getDataValue('postId'), false);
    if (!post) {
      errorNotFound();
    }

    // if action is called by author, then any operation is granted
    // for him
    if (post.getDataValue('authorId') == userId) {
      return next();
    }

    const fanClubId = post.getDataValue('fanClubId');

    // out of fan club members can't access to room
    const fanClubMember = await getFanClubMemberInfo(fanClubId, userId);
    if (!fanClubMember) {
      errorAccessDenied();
    }

    // fan club admin/owner has access to everything
    const role = fanClubMember.getDataValue('fanClubMemberRole');
    if (isFanClubAdmin(role.getDataValue('role'))) {
      return next();
    }

    // if room has member level privacy, then anyone in the fan club
    // can access to room if it's not a restricted action
    if (room.getDataValue('privacy') == RoomPrivacyEnum.member && !restrictedAction) {
      return next();
    }

    errorAccessDenied();
  };
};
