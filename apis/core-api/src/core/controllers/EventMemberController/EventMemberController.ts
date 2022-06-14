import { OrderEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import { PostMemberService, EventService } from 'core/services';
import { ResourceNotFoundError } from 'modules/exceptions';
import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';

import {
  EventMembersListParams,
  EventMembersListResult,
  EventMemberCreateParams,
  EventMemberCreateResult,
  EventMemberDeleteParams,
} from './types';

class EventMemberController extends BaseController {
  /**
   * Get all events.
   */
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = '',
    order = OrderEnum.asc,
    search = '',
    eventId,
  }: EventMembersListParams): EventMembersListResult {
    const event = await EventService.getById(eventId, false);
    const postId = event.getDataValue('postId');

    const { rows, count } = await PostMemberService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      search,
      postId,
    });

    return {
      data: rows,
      count,
      limit,
      offset,
    };
  }

  /**
   * Add new event.
   */
  static async create({
    eventId,
    userId,
  }: EventMemberCreateParams): EventMemberCreateResult {
    const event = await EventService.getById(eventId, false);
    const postId = event.getDataValue('postId');

    const postMember = await PostMemberService.create({
      postId,
      userId,
    });

    return {
      data: postMember,
    };
  }

  /**
   * Delete event.
   */
  static async delete({ eventId, userId }: EventMemberDeleteParams) {
    const event = await EventService.getById(eventId, false);
    const postId = event.getDataValue('postId');

    const postMember = await PostMemberService.getOne({
      postId,
      userId,
    });

    if (!postMember) {
      throw new ResourceNotFoundError({
        message: 'Event member not found.',
      });
    }

    PostMemberService.delete({
      postId,
      userId,
    });
  }
}

export default EventMemberController;
