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
import { OrderEnum } from '@ultras/utils';

import resources from 'core/data/lcp';
import db from 'core/data/models';
import { EventCreationAttributes } from 'core/data/models/Event';

import BaseService, { RelationGroupType } from './BaseService';
import LocationService from './LocationService';
import PostService from './PostService';
import FanClubMemberService from './FanClubMemberService';

export interface IEventByIdParams {
  id: ResourceIdentifier;
  userId?: null | ResourceIdentifier;
}

export interface IEventListParams {
  userId: ResourceIdentifier;
  search?: string;
  fanClubId?: ResourceIdentifier;
  matchId?: ResourceIdentifier;
  authorId?: ResourceIdentifier;
  teamId?: ResourceIdentifier;
}

export interface IActionByIdentifier {
  userId?: ResourceIdentifier;
  eventId?: ResourceIdentifier;
  teamId?: ResourceIdentifier;
}

export interface ICreateParams {
  privacy: EventPrivacyEnum;
  dateTime: Date;
  locationId: ResourceIdentifier;
  postId: ResourceIdentifier;
}

export interface IUpdateParams {
  privacy: EventPrivacyEnum;
  dateTime: Date;
  locationId: ResourceIdentifier;
}

export const defaultRelations = [
  'post',
  'post.fanClub',
  'post.match',
  'post.match.league',
  'post.match.team',
  'post.match.venue',
  'post.author',
  'location',
];

class EventService extends BaseService {
  protected static includeRelations(
    relations: RelationGroupType = defaultRelations,
    args: any = {}
  ) {
    relations = relations || defaultRelations;
    const includeRelations = [];

    if (this.isRelationIncluded(relations, 'post')) {
      const relationsHierarchy = this.getRelationsHierarchy(relations, {
        post: ['fanClub', 'match', 'author'],
      });

      includeRelations.push({
        model: db.Post,
        as: resources.POST.ALIAS.SINGULAR,
        ...PostService.getIncludeRelations(relationsHierarchy, {
          userId: args.userId,
          // eslint-disable-next-line max-len
          catchesFrom: `${resources.POST.ALIAS.SINGULAR}->${resources.MATCH.ALIAS.SINGULAR}`,
        }),
      });
    }

    if (this.isRelationIncluded(relations, 'location')) {
      includeRelations.push({
        model: db.Location,
        as: resources.LOCATION.ALIAS.SINGULAR,
        ...LocationService.getIncludeRelations(),
      });
    }

    return {
      include: includeRelations,
    };
  }

  /**
   * Create event instance.
   */
  static async create(
    { dateTime, privacy, postId, locationId }: ICreateParams,
    transaction?: Transaction
  ): Promise<EventViewModel> {
    const eventData: EventCreationAttributes = {
      postId: postId,
      dateTime,
      privacy,
      locationId,
    };

    const event = await db.Event.create(eventData, { transaction });

    return event;
  }

  /**
   * Update event.
   */
  static async update(
    eventId: ResourceIdentifier,
    { dateTime, privacy, locationId }: IUpdateParams,
    transaction?: Transaction
  ): Promise<EventViewModel> {
    const event = await db.Event.findOne({
      where: {
        id: eventId,
      },
    });

    await event.update(
      {
        dateTime,
        privacy,
        locationId,
      },
      { transaction }
    );

    return event;
  }

  /**
   * Get all events.
   */
  static async getAll(
    params: ServiceListParamsType<IEventListParams>
  ): ServiceListResultType<EventsViewModel> {
    // build generic query options
    const queryOptions: any = {
      limit: params.limit,
      offset: params.offset,
      ...this.includeRelations(defaultRelations, { userId: params.userId }),
    };

    // hide match and/or fanClub nested relations
    queryOptions.include.forEach((relation: any) => {
      if (relation.as === resources.POST.ALIAS.SINGULAR) {
        if (relation.include) {
          relation.include.forEach((postRelation: any) => {
            if (postRelation.as === resources.MATCH.ALIAS.SINGULAR) {
              postRelation.include = [];
            }
            if (postRelation.as === resources.FAN_CLUB.ALIAS.SINGULAR) {
              postRelation.include = [];
            }
          });
        }
      }
    });

    queryOptions.include.forEach((eventRelation: any) => {
      // find post relation (fan club is connected to posts)
      if (eventRelation.as == resources.POST.ALIAS.SINGULAR) {
        eventRelation.required = true;

        if (eventRelation.include) {
          eventRelation.include.forEach((postRelation: any) => {
            // if teamId not provided, then we can find using fanClubId and/or matchId
            if (!params.teamId) {
              // if fanClubId provided, then find fan club relation and append condition
              if (
                params.fanClubId &&
                postRelation.as == resources.FAN_CLUB.ALIAS.SINGULAR
              ) {
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
            }

            // if authorId provided, then find author relation and append condition
            if (params.authorId && postRelation.as == 'author') {
              postRelation.required = true;
              postRelation.where = this.queryInit(postRelation.where || {});

              this.queryArrayOrSingle(postRelation.where, 'id', params.authorId);
            }
          });
        }

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

    // if teamId provided, then find fanClub and/or match relation
    // and append condition
    if (params.teamId) {
      const idList = this.separateIds(params.teamId);

      if (Array.isArray(idList) && idList.length > 0) {
        const ids = idList.join(', ');

        const relationNamePost = resources.POST.ALIAS.SINGULAR;
        const relationNameFanClub = resources.FAN_CLUB.ALIAS.SINGULAR;
        const relationNameMatch = resources.MATCH.ALIAS.SINGULAR;

        queryOptions.where = db.Sequelize.literal(`
          (
            "${relationNamePost}->${relationNameFanClub}"."teamId" IN (${ids}) OR
            "${relationNamePost}->${relationNameMatch}"."teamHomeId" IN (${ids}) OR
            "${relationNamePost}->${relationNameMatch}"."teamAwayId" IN (${ids})
          )
        `);

        queryOptions.include.forEach((eventRelation: any) => {
          if (eventRelation.as == resources.POST.ALIAS.SINGULAR) {
            eventRelation.required = true;
          }
        });
      }
    }

    // set alphabetical ordering using post.title
    if (!queryOptions.order) {
      queryOptions.order = [[resources.POST.ALIAS.SINGULAR, 'title', OrderEnum.asc]];
    }

    // make condition extendable
    const oldCondition = queryOptions.where;
    queryOptions.where = {
      [db.Sequelize.Op.and]: [],
    };

    if (oldCondition) {
      queryOptions.where[db.Sequelize.Op.and].push(oldCondition);
    }

    // if is not a logged user, then we need to show him only public events,
    // otherwise more conditions need to be checked
    if (!params.userId) {
      queryOptions.where[db.Sequelize.Op.and].push({
        privacy: EventPrivacyEnum.public,
      });
    } else {
      const relationNamePost = resources.POST.ALIAS.SINGULAR;
      const relationNameFanClub = resources.FAN_CLUB.ALIAS.SINGULAR;

      const userFanClubIds = await FanClubMemberService.getFanClubIdsForMember(
        params.userId
      );

      if (!Array.isArray(userFanClubIds) || userFanClubIds.length === 0) {
        queryOptions.where[db.Sequelize.Op.and].push({
          privacy: EventPrivacyEnum.public,
        });
      } else {
        const fanClubIds = userFanClubIds.join(', ');

        queryOptions.where[db.Sequelize.Op.and].push({
          [db.Sequelize.Op.or]: [
            { privacy: EventPrivacyEnum.public },
            {
              [db.Sequelize.Op.and]: [
                { privacy: EventPrivacyEnum.private },
                db.Sequelize.literal(`
                  "${relationNamePost}->author"."id" = ${params.userId} OR
                  "${relationNamePost}->${relationNameFanClub}"."id" IN (${fanClubIds})
                `),
              ],
            },
          ],
        });
      }
    }

    const { rows, count } = await db.Event.findAndCountAll(queryOptions);
    return { rows, count };
  }

  /**
   * Get event by id.
   */
  static async getById(params: IEventByIdParams, withIncludes = true) {
    const event = await db.Event.findOne({
      where: {
        id: params.id,
      },
      ...(withIncludes
        ? this.includeRelations(defaultRelations, { userId: params.userId })
        : {}),
    });

    return event;
  }

  /**
   * Delete event.
   */
  static delete(id: ResourceIdentifier, transaction?: Transaction) {
    return db.Event.destroy(
      {
        where: { id },
      },
      { transaction }
    );
  }
}

export default EventService;
