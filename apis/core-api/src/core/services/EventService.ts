import { Transaction } from 'sequelize';
import {
  ResourceIdentifier,
  ServiceByIdResultType,
  ServiceListParamsType,
  ServiceListResultType,
  ServiceResultType,
} from 'types';
import { EventPrivacyEnum, PostTypeEnum } from '@ultras/utils';
import { EventsViewModel, EventViewModel } from '@ultras/view-models';

import resources from 'core/data/lcp';
import db from 'core/data/models';
import { EventCreationAttributes } from 'core/data/models/Event';

import BaseService from './BaseService';
import LocationService from './LocationService';
import PostService from './PostService';
import { PostCreationAttributes } from 'core/data/models/Post';

export interface EventListParamsInterface {
  search?: string;
  fanClubId?: ResourceIdentifier;
  matchId?: ResourceIdentifier;
  authorId?: ResourceIdentifier;
}

export interface ActionByIdentifierInterface {
  userId?: ResourceIdentifier;
  eventId?: ResourceIdentifier;
  teamId?: ResourceIdentifier;
}

export interface CreateParamsInterface {
  privacy: EventPrivacyEnum;
  dateTime: Date;
  locationId: ResourceIdentifier;
  postId: ResourceIdentifier;
}

export interface UpdateParamsInterface {
  privacy: EventPrivacyEnum;
  dateTime: Date;
  locationId: ResourceIdentifier;
}

class EventService extends BaseService {
  protected static includeRelations() {
    return {
      attributes: {
        exclude: ['postId'],
      },
      include: [
        {
          model: db.Post,
          as: resources.POST.ALIAS.SINGULAR,
          ...PostService.getIncludeRelations(),
        },
        {
          model: db.Location,
          as: resources.LOCATION.ALIAS.SINGULAR,
          ...LocationService.getIncludeRelations(),
        },
      ],
    };
  }

  /**
   * Create event instance.
   */
  static async create({
    dateTime,
    privacy,
    postId,
    locationId,
  }: CreateParamsInterface): Promise<EventViewModel> {
    const eventData: EventCreationAttributes = {
      postId: postId,
      dateTime,
      privacy,
      locationId,
    };

    const event = await db.Event.create(eventData);

    return event;
  }

  /**
   * Update event.
   */
  static async update(
    eventId: ResourceIdentifier,
    { dateTime, privacy, locationId }: UpdateParamsInterface
  ): Promise<EventViewModel> {
    const event = await db.Event.findOne({
      where: {
        id: eventId,
      },
    });

    await event.update({
      dateTime,
      privacy,
      locationId,
    });

    return event;
  }

  /**
   * Get all events.
   */
  static async getAll(
    params: ServiceListParamsType<EventListParamsInterface>
  ): ServiceListResultType<EventsViewModel> {
    // build generic query options
    const queryOptions: any = {
      limit: params.limit,
      offset: params.offset,
      ...this.includeRelations(),
    };

    queryOptions.include.forEach((eventRelation: any) => {
      // find post relation (fan club is connected to posts)
      if (eventRelation.as == resources.POST.ALIAS.SINGULAR) {
        eventRelation.required = true;
        eventRelation.include.forEach((postRelation: any) => {
          // if fanClubId provided, then find fan club relation and append condition
          if (params.fanClubId && postRelation.as == resources.FAN_CLUB.ALIAS.SINGULAR) {
            postRelation.required = true;
            postRelation.where = this.queryInit(postRelation.where || {});

            this.queryArrayOrSingle(postRelation.where, 'id', params.fanClubId);
          }

          // if matchId provided, then find match relation and append condition
          if (params.matchId && postRelation.as == resources.MATCH.ALIAS.SINGULAR) {
            postRelation.required = true;
            postRelation.where = this.queryInit(postRelation.where || {});

            this.queryArrayOrSingle(postRelation.where, 'id', params.matchId);
          }

          // if authorId provided, then find author relation and append condition
          if (params.authorId && postRelation.as == 'author') {
            postRelation.required = true;
            postRelation.where = this.queryInit(postRelation.where || {});

            this.queryArrayOrSingle(postRelation.where, 'id', params.authorId);
          }
        });

        // if search query was provided, then we need to search in post fields
        if (params.search) {
          const searchCondition = ['title', 'content'].map(field => ({
            [field]: {
              [db.Sequelize.Op.iLike]: `%${params.search}%`,
            },
          }));

          eventRelation.where = {
            [db.Sequelize.Op.and]: [
              eventRelation.where || {},
              {
                [db.Sequelize.Op.or]: searchCondition,
              },
            ],
          };
        }
      }
    });

    const { rows, count } = await db.Event.findAndCountAll(queryOptions);
    return { rows, count };
  }

  /**
   * Get event by id.
   */
  static async getById(id: ResourceIdentifier, withIncludes = true) {
    const event = await db.Event.findOne({
      where: {
        id: id,
      },
      ...(withIncludes ? this.includeRelations() : {}),
    });

    return event;
  }

  /**
   * Delete event.
   */
  static delete(id: ResourceIdentifier, transaction?: Transaction) {
    return db.Event.destroy({
      where: { id },
      transaction,
    });
  }
}

export default EventService;
