import { OrderEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import { PostMemberService, RoomService } from 'core/services';
import { ResourceNotFoundError } from 'modules/exceptions';
import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';

import {
  RoomMembersListParams,
  RoomMembersListResult,
  RoomMemberCreateParams,
  RoomMemberCreateResult,
  RoomMemberDeleteParams,
} from './types';

class RoomMemberController extends BaseController {
  /**
   * Get all rooms.
   */
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = '',
    order = OrderEnum.asc,
    search = '',
    roomId,
  }: RoomMembersListParams): RoomMembersListResult {
    const room = await RoomService.getById({ id: roomId }, false);
    const postId = room.getDataValue('postId');

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
   * Add new room.
   */
  static async create({
    roomId,
    userId,
  }: RoomMemberCreateParams): RoomMemberCreateResult {
    const room = await RoomService.getById({ id: roomId }, false);
    const postId = room.getDataValue('postId');

    const postMember = await PostMemberService.create({
      postId,
      userId,
    });

    return {
      data: postMember,
    };
  }

  /**
   * Delete room.
   */
  static async delete({ roomId, userId }: RoomMemberDeleteParams) {
    const room = await RoomService.getById({ id: roomId }, false);
    const postId = room.getDataValue('postId');

    const postMember = await PostMemberService.getOne({
      postId,
      userId,
    });

    if (!postMember) {
      throw new ResourceNotFoundError({
        message: 'Room member not found.',
      });
    }

    PostMemberService.delete({
      postId,
      userId,
    });
  }
}

export default RoomMemberController;
