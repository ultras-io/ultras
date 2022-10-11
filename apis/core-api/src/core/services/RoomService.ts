import { Transaction } from 'sequelize';
import { ResourceIdentifier, ServiceListParamsType, ServiceListResultType } from 'types';
import {
  FanClubMemberRoleEnum,
  FanClubPrivacyEnum,
  OrderEnum,
  RoomPrivacyEnum,
} from '@ultras/utils';
import { RoomsViewModel, RoomViewModel } from '@ultras/view-models';

import resources from 'core/data/lcp';
import db from 'core/data/models';
import { RoomCreationAttributes } from 'core/data/models/Room';

import BaseService from './BaseService';
import PostService from './PostService';
import FanClubMemberService from './FanClubMemberService';

export interface IRoomByIdParams {
  id: ResourceIdentifier;
  userId?: null | ResourceIdentifier;
}

export interface IRoomListParams {
  userId: null | ResourceIdentifier;
  search?: string;
  fanClubId?: ResourceIdentifier | Array<ResourceIdentifier>;
  authorId?: ResourceIdentifier;
}

export interface ICreateParams {
  dateTime: Date;
  privacy: RoomPrivacyEnum;
  postId: ResourceIdentifier;
}

export interface IUpdateParams {
  dateTime: Date;
  privacy: RoomPrivacyEnum;
}

class RoomService extends BaseService {
  protected static includeRelations(args: any = {}) {
    return {
      attributes: {
        exclude: ['postId'],
      },
      include: [
        {
          model: db.Post,
          as: resources.POST.ALIAS.SINGULAR,
          ...PostService.getIncludeRelations({ userId: args.userId }),
        },
      ],
    };
  }

  /**
   * Create room instance.
   */
  static async create(
    { dateTime, privacy, postId }: ICreateParams,
    transaction?: Transaction
  ): Promise<RoomViewModel> {
    const roomData: RoomCreationAttributes = {
      postId: postId,
      dateTime,
      privacy,
    };

    const room = await db.Room.create(roomData, { transaction });

    return room;
  }

  /**
   * Get all rooms.
   */
  static async getAll(
    params: ServiceListParamsType<IRoomListParams>
  ): ServiceListResultType<RoomsViewModel> {
    let userFanClubIdsMember: null | Array<ResourceIdentifier> = null;
    let userFanClubIdsAdmin: null | Array<ResourceIdentifier> = null;

    // if user is logged, then we need to show him rooms from their fan clubs
    if (params.userId) {
      userFanClubIdsMember = await FanClubMemberService.getFanClubIdsForMember(
        params.userId,
        FanClubMemberRoleEnum.member
      );

      userFanClubIdsAdmin = await FanClubMemberService.getFanClubIdsForMember(
        params.userId,
        [FanClubMemberRoleEnum.admin, FanClubMemberRoleEnum.owner]
      );

      if (!params.fanClubId) {
        params.fanClubId = [...userFanClubIdsMember, ...userFanClubIdsAdmin];
      }
    }

    // build generic query options
    const queryOptions: any = {
      limit: params.limit,
      offset: params.offset,
      ...this.includeRelations({ userId: params.userId }),
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

    queryOptions.include.forEach((roomRelation: any) => {
      // find post relation (fan club is connected to posts)
      if (roomRelation.as == resources.POST.ALIAS.SINGULAR) {
        roomRelation.required = true;
        if (roomRelation.include) {
          roomRelation.include.forEach((postRelation: any) => {
            // if fanClubId provided, then find fan club relation and append condition
            if (
              params.fanClubId &&
              postRelation.as == resources.FAN_CLUB.ALIAS.SINGULAR
            ) {
              postRelation.required = true;
              postRelation.where = this.queryInit(postRelation.where || {});

              this.queryArrayOrSingle(postRelation.where, 'id', params.fanClubId);
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

          roomRelation.where = {
            [db.Sequelize.Op.and]: [
              roomRelation.where || {},
              {
                [db.Sequelize.Op.or]: searchCondition,
              },
            ],
          };
        }
      }
    });

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

    const relationNamePost = resources.POST.ALIAS.SINGULAR;
    const relationNameRoom = resources.ROOM.RELATION;
    const relationNameFanClub = resources.FAN_CLUB.ALIAS.SINGULAR;

    // if is not a logged user, then we need to show him member-level rooms
    // only on public fan clubs, otherwise he can't see data.
    const moreFilterConditions: any = {
      [db.Sequelize.Op.or]: [
        {
          [db.Sequelize.Op.and]: [
            db.Sequelize.literal(`
              "${relationNamePost}->${relationNameFanClub}"."privacy" =
                '${FanClubPrivacyEnum.public}'
            `),
            db.Sequelize.literal(`
              "${relationNameRoom}"."privacy" = '${RoomPrivacyEnum.member}'
            `),
          ],
        },
      ],
    };

    if (params.userId && userFanClubIdsMember && userFanClubIdsAdmin) {
      const idList = [...userFanClubIdsMember, ...userFanClubIdsAdmin];

      if (Array.isArray(idList) && idList.length > 0) {
        const ids = idList.join(', ');

        moreFilterConditions[db.Sequelize.Op.or].push({
          [db.Sequelize.Op.and]: [
            { privacy: RoomPrivacyEnum.member },
            db.Sequelize.literal(`
            "${relationNamePost}->${relationNameFanClub}"."id" IN (${ids})
          `),
          ],
        });
      }

      if (Array.isArray(userFanClubIdsAdmin) && userFanClubIdsAdmin.length > 0) {
        const ids = userFanClubIdsAdmin.join(', ');

        moreFilterConditions[db.Sequelize.Op.or].push({
          [db.Sequelize.Op.and]: [
            { privacy: RoomPrivacyEnum.admin },
            db.Sequelize.literal(`
              "${relationNamePost}->${relationNameFanClub}"."id" IN (${ids})
            `),
          ],
        });
      }
    }

    queryOptions.where[db.Sequelize.Op.and].push(moreFilterConditions);

    const { rows, count } = await db.Room.findAndCountAll(queryOptions);
    return { rows, count };
  }

  /**
   * Get room by id.
   */
  static async getById(params: IRoomByIdParams, withIncludes = true) {
    const room = await db.Room.findOne({
      where: {
        id: params.id,
      },
      ...(withIncludes ? this.includeRelations({ userId: params.userId }) : {}),
    });

    return room;
  }

  /**
   * Update room.
   */
  static async update(
    roomId: ResourceIdentifier,
    { privacy, dateTime }: IUpdateParams,
    transaction?: Transaction
  ): Promise<RoomViewModel> {
    const room = await db.Room.findOne({
      where: {
        id: roomId,
      },
    });

    await room.update(
      {
        privacy,
      },
      { transaction }
    );

    return room;
  }

  /**
   * Delete room.
   */
  static delete(id: ResourceIdentifier, transaction?: Transaction) {
    return db.Room.destroy(
      {
        where: { id },
      },
      { transaction }
    );
  }
}

export default RoomService;
