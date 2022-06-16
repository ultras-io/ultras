import { EventPrivacyEnum, OrderEnum, PostTypeEnum } from '@ultras/utils';
import { ResourceIdentifier } from 'types';
import BaseController from 'core/controllers/BaseController';
import { EventService, LocationService, PostService } from 'core/services';
import { AccessDeniedError, ResourceNotFoundError } from 'modules/exceptions';
import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';

import {
  EventByIdResult,
  EventsListParams,
  EventsListResult,
  EventCreateParams,
  EventCreateResult,
  EventDeleteParams,
  EventUpdateParams,
  EventUpdateResult,
} from './types';

class EventController extends BaseController {
  /**
   * Get all events.
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
   * Get event by id.
   */
  static async getById(id: ResourceIdentifier): EventByIdResult {
    const event = await EventService.getById(id);

    return {
      data: event,
    };
  }

  /**
   * Add new event.
   */
  static async create(params: EventCreateParams): EventCreateResult {
    const location = await LocationService.createOrGet({
      name: params.locationName,
      lat: params.locationLat,
      lng: params.locationLng,
    });

    const post = await PostService.create({
      authorId: params.authorId,
      matchId: params.matchId,
      fanClubId: params.fanClubId,
      title: params.title,
      content: params.content,
      type: PostTypeEnum.event,
    });

    const event = await EventService.create({
      locationId: location.getDataValue('id'),
      postId: post.getDataValue('id'),
      privacy: !params.fanClubId ? EventPrivacyEnum.public : params.privacy,
      dateTime: params.dateTime,
    });

    return {
      data: event,
    };
  }

  /**
   * Add new event.
   */
  static async update(params: EventUpdateParams): EventUpdateResult {
    const location = await LocationService.createOrGet({
      name: params.locationName,
      lat: params.locationLat,
      lng: params.locationLng,
    });

    const event = await EventService.getById(params.id);
    const postId = event.getDataValue('post').getDataValue('id');

    await PostService.update(postId, {
      title: params.title,
      content: params.content,
    });

    const fanClubId = event.getDataValue('post').getDataValue('fanClubId');

    const eventUpdate = await EventService.update(params.id, {
      locationId: location.getDataValue('id'),
      privacy: !fanClubId ? EventPrivacyEnum.public : params.privacy,
      dateTime: params.dateTime,
    });

    return {
      data: eventUpdate,
    };
  }

  /**
   * Delete event.
   */
  static async delete(params: EventDeleteParams) {
    const event = await EventService.getById(params.id);

    const authorId = event.getDataValue('post').getDataValue('author').getDataValue('id');
    const postId = event.getDataValue('post').getDataValue('id');

    if (authorId !== params.authorId) {
      throw new AccessDeniedError({
        message: 'Not owned.',
      });
    }

    this.withTransaction(async transaction => {
      await PostService.delete(postId, transaction);
      await EventService.delete(params.id, transaction);
    });
  }
}

export default EventController;
