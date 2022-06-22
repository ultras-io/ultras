import { PostTypeEnum, OrderEnum, RoomPrivacyEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import { RoomService, PostService } from 'core/services';
import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';

import {
  RoomCreateParams,
  RoomCreateResult,
  RoomsListParams,
  RoomsListResult,
  RoomByIdResult,
  RoomUpdateParams,
  RoomUpdateResult,
} from './types';

class RoomController extends BaseController {
  /**
   * Add new room.
   */
  static async create(params: RoomCreateParams): RoomCreateResult {
    const room = await this.withTransaction(async transaction => {
      const post = await PostService.create(
        {
          authorId: params.authorId,
          fanClubId: params.fanClubId,
          title: params.title,
          content: params.content,
          type: PostTypeEnum.room,
        },
        transaction
      );

      const room = await RoomService.create(
        {
          postId: post.getDataValue('id'),
          privacy: params.privacy,
        },
        transaction
      );

      return room;
    });

    return {
      data: room,
    };
  }
  /**
   * Get all rooms.
   */
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = '',
    order = OrderEnum.asc,
    search = '',
    fanClubId,
    authorId,
  }: RoomsListParams): RoomsListResult {
    const { rows, count } = await RoomService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      search,
      fanClubId,
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
   * Get room by id.
   */
  static async getById(id: ResourceIdentifier): RoomByIdResult {
    const room = await RoomService.getById(id);

    return {
      data: room,
    };
  }

  /**
   * Update room.
   */
  static async update(params: RoomUpdateParams): RoomUpdateResult {
    const roomUpdate = await this.withTransaction(async transaction => {
      const room = await RoomService.getById(params.id);
      const postId = room.getDataValue('post').getDataValue('id');

      await PostService.update(
        postId,
        {
          title: params.title,
          content: params.content,
        },
        transaction
      );

      const roomUpdate = await RoomService.update(
        params.id,
        {
          privacy: params.privacy,
        },
        transaction
      );

      return roomUpdate;
    });

    return {
      data: roomUpdate,
    };
  }
}

export default RoomController;
