import { EventPrivacyEnum } from '@ultras/utils';
import { Middleware, Next as KoaNext } from 'koa';
import { Context } from 'types';
import { EventService, PostService } from 'core/services';
import { AccessDeniedError, ResourceNotFoundError } from 'modules/exceptions';

export default (restrictedAction = false): Middleware => {
  return async (ctx: Context, next: KoaNext) => {
    const eventId = ctx.request.params.id;
    const userId = ctx.user.userId;

    const event = await EventService.getById(eventId, false);
    if (!event) {
      throw new ResourceNotFoundError({
        message: 'Event not found.',
      });
    }

    // if event is public then anyone can access to event
    if (event.getDataValue('privacy') == EventPrivacyEnum.public) {
      return next();
    }

    // event author can access to event
    const post = await PostService.getById(event.getDataValue('postId'), false);
    if (post.getDataValue('authorId') == userId) {
      return next();
    }

    let hasAccess = true;

    // if user is not a author of event
    if (!restrictedAction) {
      // @TODO: check user can access to event (e.g. in same fan club)
    } else {
      hasAccess = false;
    }

    if (!hasAccess) {
      throw new AccessDeniedError({
        message: "You don't have access to this event.",
      });
    }

    return next();
  };
};
