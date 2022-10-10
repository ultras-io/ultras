import { CommentTypeEnum, OrderEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import { EventService, CommentService } from 'core/services';
import { ResourceNotFoundError } from 'modules/exceptions';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import type {
  CommentsListParams,
  CommentListResult,
  ICommentCreateParams,
  ICommentUpdateParams,
  ICommentDeleteParams,
} from './types';

class EventCommentController extends BaseController {
  /**
   * Add comment under event.
   */
  static async create({ userId, eventId, content }: ICommentCreateParams) {
    // get event model
    const event = await EventService.getById({ id: eventId }, false);
    if (!event) {
      throw new ResourceNotFoundError({
        message: 'Event not found.',
      });
    }

    // add comment under post
    const comment = await CommentService.comment({
      resourceType: CommentTypeEnum.post,
      resourceId: event.getDataValue('postId'),
      userId,
      content,
    });

    return comment;
  }

  /**
   * Update comment under event.
   */
  static async update({ userId, eventId, commentId, content }: ICommentUpdateParams) {
    // get event model
    const event = await EventService.getById({ id: eventId }, false);
    if (!event) {
      throw new ResourceNotFoundError({
        message: 'Event not found.',
      });
    }

    // update comment under post
    const comment = await CommentService.update({
      resourceType: CommentTypeEnum.post,
      resourceId: event.getDataValue('postId'),
      userId,
      commentId,
      content,
    });

    return comment;
  }

  /**
   * Make event un-liked by user.
   */
  static async delete({ userId, eventId, commentId }: ICommentDeleteParams) {
    // get event model
    const event = await EventService.getById({ id: eventId }, false);
    if (!event) {
      throw new ResourceNotFoundError({
        message: 'Event not found.',
      });
    }

    // uncomment post
    await CommentService.uncomment({
      resourceType: CommentTypeEnum.post,
      resourceId: event.getDataValue('postId'),
      userId,
      commentId,
    });
  }

  /**
   * Get all comments of event.
   */
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'id',
    order = OrderEnum.desc,
    eventId,
  }: CommentsListParams): CommentListResult {
    // get event model
    const event = await EventService.getById({ id: eventId }, false);
    if (!event) {
      throw new ResourceNotFoundError({
        message: 'Event not found.',
      });
    }

    // get all comments by post id
    const comments = await CommentService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      resourceType: CommentTypeEnum.post,
      resourceId: event.getDataValue('postId'),
    });

    return {
      data: comments,
      limit,
      offset,
    };
  }
}

export default EventCommentController;
