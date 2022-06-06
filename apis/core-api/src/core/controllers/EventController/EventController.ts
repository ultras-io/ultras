import { OrderEnum } from '@ultras/utils';
import { ResourceIdentifier } from 'types';
import BaseController from 'core/controllers/BaseController';
import { EventService } from 'core/services';
import { ResourceNotFoundError } from 'modules/exceptions';
import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';

import { EventByIdResult, EventsListParams, EventsListResult } from './types';
import { EventCreateParams, EventCreateResult } from '.';

class EventController extends BaseController {
  /**
   * Get all favorite teams.
   */
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = '',
    order = OrderEnum.asc,
    search = '',
    fanClubId,
    matchId,
    authorId,
  }: EventsListParams): EventsListResult {
    const { rows, count } = await EventService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      search,
      fanClubId,
      matchId,
      authorId,
    });

    return {
      data: rows,
      count,
      limit,
      offset,
    };
  }

  /**
   * Get favorite team by pivot relation id.
   */
  static async getById(id: ResourceIdentifier): EventByIdResult {
    const event = await EventService.getById(id);
    if (!event) {
      throw new ResourceNotFoundError({
        message: 'Event not found.',
      });
    }

    return {
      data: event,
    };
  }

  /**
   * Add new team(s) to user's favorite list.
   */
  static async create(params: EventCreateParams): EventCreateResult {
    const event = await EventService.create({
      authorId: params.authorId,
      matchId: params.matchId,
      fanClubId: params.fanClubId,
      title: params.title,
      content: params.content,
      privacy: params.privacy,
      dateTime: params.dateTime,
    });

    return {
      data: event,
    };
  }
}

export default EventController;
