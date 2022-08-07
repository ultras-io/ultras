import { EventPrivacyEnum, FanClubMemberRoleEnum } from '@ultras/utils';
import { Middleware, Next as KoaNext } from 'koa';
import { Context } from 'types';
import {
  EventService,
  PostService,
  FanClubMemberService,
  FanClubService,
} from 'core/services';
import { AccessDeniedError, ResourceNotFoundError } from 'modules/exceptions';

const errorNotFound = () => {
  throw new ResourceNotFoundError({
    message: 'Event not found.',
  });
};

const errorAccessDenied = () => {
  throw new AccessDeniedError({
    message: "You don't have access to this event.",
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

export default (
  // restricted actions means update or delete
  restrictedAction = false
): Middleware => {
  return async (ctx: Context, next: KoaNext) => {
    const eventId = ctx.request.params.id;
    const userId = ctx.user?.userId;

    const event = await EventService.getById({ id: eventId }, false);
    if (!event) {
      errorNotFound();
    }

    const post = await PostService.getById(event.getDataValue('postId'), false);
    if (!post) {
      errorNotFound();
    }

    const fanClubId = post.getDataValue('fanClubId');

    // if action is called by author, then any operation is granted
    // for him
    if (post.getDataValue('authorId') == userId) {
      return next();
    }

    // if event is public then anyone can access to event if it's
    // not a restricted action
    if (event.getDataValue('privacy') == EventPrivacyEnum.public) {
      // if is not a restricted action to event then access granted
      if (!restrictedAction) {
        return next();
      }

      // out of fan club members can't access to event with
      // restricted action
      const fanClubMember = await getFanClubMemberInfo(fanClubId, userId);
      if (!fanClubMember) {
        errorAccessDenied();
      }

      const role = fanClubMember.getDataValue('fanClubMemberRole');
      if (isFanClubAdmin(role.getDataValue('role'))) {
        return next();
      }

      errorAccessDenied();
    }

    // if event is private, then it must have a fan club
    if (!fanClubId) {
      errorNotFound();
    }

    const fanClubMember = await getFanClubMemberInfo(fanClubId, userId);
    if (!fanClubMember) {
      errorAccessDenied();
    }

    // everyone in same fan club has access to event, if it's
    // not a restricted action
    if (!restrictedAction) {
      return next();
    }

    const role = fanClubMember.getDataValue('fanClubMemberRole');
    if (!isFanClubAdmin(role.getDataValue('role'))) {
      errorAccessDenied();
    }

    return next();
  };
};
