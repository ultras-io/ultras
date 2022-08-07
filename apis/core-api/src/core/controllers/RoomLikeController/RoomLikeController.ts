import { LikeTypeEnum, OrderEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import { RoomService, LikeService } from 'core/services';
import { ResourceNotFoundError } from 'modules/exceptions';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import type { LikesListParams, LikeListResult, LikeUnlikeParamsInterface } from './types';

class RoomLikeController extends BaseController {
  /**
   * Make room liked by user.
   */
  static async create({ userId, roomId }: LikeUnlikeParamsInterface) {
    // get room model
    const room = await RoomService.getById({ id: roomId }, false);
    if (!room) {
      throw new ResourceNotFoundError({
        message: 'Room not found.',
      });
    }

    // like post
    await LikeService.like({
      resourceType: LikeTypeEnum.post,
      resourceId: room.getDataValue('postId'),
      userId,
    });
  }

  /**
   * Make room un-liked by user.
   */
  static async delete({ userId, roomId }: LikeUnlikeParamsInterface) {
    // get room model
    const room = await RoomService.getById({ id: roomId }, false);
    if (!room) {
      throw new ResourceNotFoundError({
        message: 'Room not found.',
      });
    }

    // unlike post
    await LikeService.unlike({
      resourceType: LikeTypeEnum.post,
      resourceId: room.getDataValue('postId'),
      userId,
    });
  }

  /**
   * Get all likes of room.
   */
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'username',
    order = OrderEnum.asc,
    roomId,
  }: LikesListParams): LikeListResult {
    // get room model
    const room = await RoomService.getById({ id: roomId }, false);
    if (!room) {
      throw new ResourceNotFoundError({
        message: 'Room not found.',
      });
    }

    // get all likes by post id
    const likes = await LikeService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      resourceType: LikeTypeEnum.post,
      resourceId: room.getDataValue('postId'),
    });

    return {
      data: likes,
      limit,
      offset,
    };
  }
}

export default RoomLikeController;
