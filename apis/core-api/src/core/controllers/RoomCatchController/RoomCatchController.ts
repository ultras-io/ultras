import { CatchTypeEnum, OrderEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import { RoomService, CatchService } from 'core/services';
import { ResourceNotFoundError } from 'modules/exceptions';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import type { CatchListParams, CatchListResult, ICatchUncatchParams } from './types';

class RoomCatchController extends BaseController {
  /**
   * Make room caught by user.
   */
  static async create({ userId, roomId }: ICatchUncatchParams) {
    // get room model
    const room = await RoomService.getById({ id: roomId }, false);
    if (!room) {
      throw new ResourceNotFoundError({
        message: 'Room not found.',
      });
    }

    // catch post
    await CatchService.catch({
      resourceType: CatchTypeEnum.post,
      resourceId: room.getDataValue('postId'),
      userId,
    });
  }

  /**
   * Make room uncaught by user.
   */
  static async delete({ userId, roomId }: ICatchUncatchParams) {
    // get room model
    const room = await RoomService.getById({ id: roomId }, false);
    if (!room) {
      throw new ResourceNotFoundError({
        message: 'Room not found.',
      });
    }

    // non-catch post
    await CatchService.uncatch({
      resourceType: CatchTypeEnum.post,
      resourceId: room.getDataValue('postId'),
      userId,
    });
  }

  /**
   * Get all catches of room.
   */
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'username',
    order = OrderEnum.asc,
    roomId,
  }: CatchListParams): CatchListResult {
    // get room model
    const room = await RoomService.getById({ id: roomId }, false);
    if (!room) {
      throw new ResourceNotFoundError({
        message: 'Room not found.',
      });
    }

    // get all catches by post id
    const catches = await CatchService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      resourceType: CatchTypeEnum.post,
      resourceId: room.getDataValue('postId'),
    });

    return {
      data: catches,
      limit,
      offset,
    };
  }
}

export default RoomCatchController;
