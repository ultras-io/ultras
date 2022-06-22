import { Transaction } from 'sequelize';
import { ResourceIdentifier, ServiceListParamsType, ServiceListResultType } from 'types';
import { RoomPrivacyEnum } from '@ultras/utils';
import { RoomsViewModel, RoomViewModel } from '@ultras/view-models';

import resources from 'core/data/lcp';
import db from 'core/data/models';
import { RoomCreationAttributes } from 'core/data/models/Room';

import BaseService from './BaseService';
import PostService from './PostService';

export interface RoomListParamsInterface {
  search?: string;
  fanClubId?: ResourceIdentifier;
  authorId?: ResourceIdentifier;
}

export interface CreateParamsInterface {
  privacy: RoomPrivacyEnum;
  postId: ResourceIdentifier;
}

export interface UpdateParamsInterface {
  privacy: RoomPrivacyEnum;
}

class RoomService extends BaseService {
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
      ],
    };
  }

  /**
   * Create room instance.
   */
  static async create(
    { privacy, postId }: CreateParamsInterface,
    transaction?: Transaction
  ): Promise<RoomViewModel> {
    const roomData: RoomCreationAttributes = {
      postId: postId,
      privacy,
    };

    const room = await db.Room.create(roomData, { transaction });

    return room;
  }

  /**
   * Get all rooms.
   */
  static async getAll(
    params: ServiceListParamsType<RoomListParamsInterface>
  ): ServiceListResultType<RoomsViewModel> {
    // build generic query options
    const queryOptions: any = {
      limit: params.limit,
      offset: params.offset,
      ...this.includeRelations(),
    };

    queryOptions.include.forEach((roomRelation: any) => {
      // find post relation (fan club is connected to posts)
      if (roomRelation.as == resources.POST.ALIAS.SINGULAR) {
        roomRelation.required = true;
        roomRelation.include.forEach((postRelation: any) => {
          // if fanClubId provided, then find fan club relation and append condition
          if (params.fanClubId && postRelation.as == resources.FAN_CLUB.ALIAS.SINGULAR) {
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

    const { rows, count } = await db.Room.findAndCountAll(queryOptions);
    return { rows, count };
  }

  /**
   * Get room by id.
   */
  static async getById(id: ResourceIdentifier, withIncludes = true) {
    const room = await db.Room.findOne({
      where: {
        id: id,
      },
      ...(withIncludes ? this.includeRelations() : {}),
    });

    return room;
  }

  /**
   * Update room.
   */
  static async update(
    roomId: ResourceIdentifier,
    { privacy }: UpdateParamsInterface,
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
