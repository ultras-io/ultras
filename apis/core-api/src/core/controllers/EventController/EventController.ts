import { EventPrivacyEnum, OrderEnum, PostTypeEnum } from '@ultras/utils';
import { ResourceIdentifier } from 'types';
import BaseController from 'core/controllers/BaseController';
import { EventService, LocationService, PostService } from 'core/services';
import { AccessDeniedError, ResourceNotFoundError } from 'modules/exceptions';
import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';

import {
  EventByIdParams,
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
    userId,
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = '',
    order = OrderEnum.asc,
    search = '',
    fanClubId,
    matchId,
    authorId,
    teamId,
  }: EventsListParams): EventsListResult {
    const { rows, count } = await EventService.getAll({
      userId,
      limit,
      offset,
      orderAttr,
      order,
      search,
      fanClubId,
      matchId,
      authorId,
      teamId,
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
  static async getById(params: EventByIdParams): EventByIdResult {
    const event = await EventService.getById(params);

    return {
      data: event,
    };
  }

  /**
   * Add new event.
   */
  static async create({
    authorId,
    title,
    content,
    fanClubId,
    matchId,
    image,
    privacy,
    dateTime,
    locationName,
    locationLat,
    locationLng,
  }: EventCreateParams): EventCreateResult {
    const event = await this.withTransaction(async transaction => {
      let location = null;

      if (locationName) {
        location = await LocationService.createOrGet({
          name: locationName,
          lat: locationLat,
          lng: locationLng,
        });
      }

      const post = await PostService.create(
        {
          image: image,
          authorId: authorId,
          matchId: matchId,
          fanClubId: fanClubId,
          title: title,
          content: content,
          type: PostTypeEnum.event,
        },
        transaction
      );

      const event = await EventService.create(
        {
          locationId: location ? location.getDataValue('id') : null,
          postId: post.getDataValue('id'),
          privacy: !fanClubId ? EventPrivacyEnum.public : privacy,
          dateTime: dateTime,
        },
        transaction
      );

      return event;
    });

    const createdEvent = await EventService.getById({ id: event.getDataValue('id') });

    return {
      data: createdEvent,
    };
  }

  /**
   * Add new event.
   */
  static async update({
    id,
    title,
    content,
    privacy,
    dateTime,
    image,
    locationName,
    locationLat,
    locationLng,
  }: EventUpdateParams): EventUpdateResult {
    const eventUpdate = await this.withTransaction(async transaction => {
      let location = null;
      if (locationName) {
        location = await LocationService.createOrGet({
          name: locationName,
          lat: locationLat,
          lng: locationLng,
        });
      }

      const event = await EventService.getById({ id });
      const postId = event.getDataValue('post').getDataValue('id');

      await PostService.update(
        postId,
        {
          image: image,
          title: title,
          content: content,
        },
        transaction
      );

      const fanClubId = event.getDataValue('post').getDataValue('fanClubId');

      const eventUpdate = await EventService.update(
        id,
        {
          locationId: location ? location.getDataValue('id') : null,
          privacy: !fanClubId ? EventPrivacyEnum.public : privacy,
          dateTime: dateTime,
        },
        transaction
      );

      return eventUpdate;
    });

    return {
      data: eventUpdate,
    };
  }

  /**
   * Delete event.
   */
  static async delete(params: EventDeleteParams) {
    const event = await EventService.getById({ id: params.id });

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
