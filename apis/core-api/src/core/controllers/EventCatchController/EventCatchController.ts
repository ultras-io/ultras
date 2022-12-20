import { CatchTypeEnum, OrderEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import { EventService, CatchService } from 'core/services';
import { ResourceNotFoundError } from 'modules/exceptions';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import type { CatchListParams, CatchListResult, ICatchUncatchParams } from './types';

class EventCatchController extends BaseController {
  /**
   * Make event caught by user.
   */
  static async create({ userId, eventId }: ICatchUncatchParams) {
    // get event model
    const event = await EventService.getById({ id: eventId }, false);
    if (!event) {
      throw new ResourceNotFoundError({
        message: 'Event not found.',
      });
    }

    // catch post
    await CatchService.catch({
      resourceType: CatchTypeEnum.post,
      resourceId: event.getDataValue('postId'),
      userId,
    });
  }

  /**
   * Make event uncaught by user.
   */
  static async delete({ userId, eventId }: ICatchUncatchParams) {
    // get event model
    const event = await EventService.getById({ id: eventId }, false);
    if (!event) {
      throw new ResourceNotFoundError({
        message: 'Event not found.',
      });
    }

    // non-catch post
    await CatchService.uncatch({
      resourceType: CatchTypeEnum.post,
      resourceId: event.getDataValue('postId'),
      userId,
    });
  }

  /**
   * Get all catches of event.
   */
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'username',
    order = OrderEnum.asc,
    eventId,
  }: CatchListParams): CatchListResult {
    // get event model
    const event = await EventService.getById({ id: eventId }, false);
    if (!event) {
      throw new ResourceNotFoundError({
        message: 'Event not found.',
      });
    }

    // get all catches by post id
    const { rows, count } = await CatchService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      resourceType: CatchTypeEnum.post,
      resourceId: event.getDataValue('postId'),
    });

    return {
      data: rows,
      count,
      limit,
      offset,
    };
  }
}

export default EventCatchController;
