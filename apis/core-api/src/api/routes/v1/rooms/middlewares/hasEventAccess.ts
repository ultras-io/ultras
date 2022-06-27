import { RoomPrivacyEnum } from '@ultras/utils';
import { Middleware, Next as KoaNext } from 'koa';
import { Context } from 'types';
import { RoomService, PostService } from 'core/services';
import { AccessDeniedError, ResourceNotFoundError } from 'modules/exceptions';

export default (restrictedAction = false): Middleware => {
  return async (ctx: Context, next: KoaNext) => {
    const roomId = ctx.request.params.id;
    const userId = ctx.user.userId;

    const room = await RoomService.getById(roomId, false);
    if (!room) {
      throw new ResourceNotFoundError({
        message: 'Room not found.',
      });
    }

    // room author can access to room
    const post = await PostService.getById(room.getDataValue('postId'), false);
    if (!post) {
      throw new ResourceNotFoundError({
        message: 'Room not found.',
      });
    }

    if (post.getDataValue('authorId') == userId) {
      return next();
    }

    let hasAccess = true;

    // if user is not a author of room
    if (!restrictedAction) {
      // if room is member, then anyone in fan club can access to room
      if (room.getDataValue('privacy') == RoomPrivacyEnum.member) {
        // @TODO: check user in fan club with member or admin role.
        return next();
      }

      // if room is admin, then only admins and owner in fan club can access to room
      if (room.getDataValue('privacy') == RoomPrivacyEnum.admin) {
        // @TODO: check is user an admin/owner of fan club
        return next();
      }
    } else {
      hasAccess = false;
    }

    if (!hasAccess) {
      throw new AccessDeniedError({
        message: "You don't have access to this room.",
      });
    }

    return next();
  };
};
