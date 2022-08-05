import { LikeTypeEnum, OrderEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import { EventService, LikeService } from 'core/services';
import { ResourceNotFoundError } from 'modules/exceptions';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import type { LikesListParams, LikeListResult, LikeUnlikeParamsInterface } from './types';

class EventLikeController extends BaseController {
  /**
   * Make event liked by user.
   */
  static async create({ userId, eventId }: LikeUnlikeParamsInterface) {
    // get event model
    const event = await EventService.getById({ id: eventId }, false);
    if (!event) {
      throw new ResourceNotFoundError({
        message: 'Event not found.',
      });
    }

    // like post
    await LikeService.like({
      resourceType: LikeTypeEnum.post,
      resourceId: event.getDataValue('postId'),
      userId,
    });
  }

  /**
   * Make event un-liked by user.
   */
  static async delete({ userId, eventId }: LikeUnlikeParamsInterface) {
    // get event model
    const event = await EventService.getById({ id: eventId }, false);
    if (!event) {
      throw new ResourceNotFoundError({
        message: 'Event not found.',
      });
    }

    // unlike post
    await LikeService.unlike({
      resourceType: LikeTypeEnum.post,
      resourceId: event.getDataValue('postId'),
      userId,
    });
  }

  /**
   * Get all likes of event.
   */
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'username',
    order = OrderEnum.asc,
    eventId,
  }: LikesListParams): LikeListResult {
    // get event model
    const event = await EventService.getById({ id: eventId }, false);
    if (!event) {
      throw new ResourceNotFoundError({
        message: 'Event not found.',
      });
    }

    // get all likes by post id
    const likes = await LikeService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      resourceType: LikeTypeEnum.post,
      resourceId: event.getDataValue('postId'),
    });

    return {
      data: likes,
      limit,
      offset,
    };
  }
}

export default EventLikeController;
