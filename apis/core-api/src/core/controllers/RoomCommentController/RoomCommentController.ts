import { CommentTypeEnum, OrderEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import { RoomService, CommentService } from 'core/services';
import { ResourceNotFoundError } from 'modules/exceptions';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import type {
  CommentsListParams,
  CommentListResult,
  CommentCreateParamsInterface,
  CommentUpdateParamsInterface,
  CommentDeleteParamsInterface,
} from './types';

class RoomCommentController extends BaseController {
  /**
   * Add comment under room.
   */
  static async create({ userId, roomId, content }: CommentCreateParamsInterface) {
    // get room model
    const room = await RoomService.getById({ id: roomId }, false);
    if (!room) {
      throw new ResourceNotFoundError({
        message: 'Room not found.',
      });
    }

    // add comment under post
    const comment = await CommentService.comment({
      resourceType: CommentTypeEnum.post,
      resourceId: room.getDataValue('postId'),
      userId,
      content,
    });

    return comment;
  }

  /**
   * Update comment under room.
   */
  static async update({
    userId,
    roomId,
    commentId,
    content,
  }: CommentUpdateParamsInterface) {
    // get room model
    const room = await RoomService.getById({ id: roomId }, false);
    if (!room) {
      throw new ResourceNotFoundError({
        message: 'Room not found.',
      });
    }

    // update comment under post
    const comment = await CommentService.update({
      resourceType: CommentTypeEnum.post,
      resourceId: room.getDataValue('postId'),
      userId,
      commentId,
      content,
    });

    return comment;
  }

  /**
   * Make room un-liked by user.
   */
  static async delete({ userId, roomId, commentId }: CommentDeleteParamsInterface) {
    // get room model
    const room = await RoomService.getById({ id: roomId }, false);
    if (!room) {
      throw new ResourceNotFoundError({
        message: 'Room not found.',
      });
    }

    // uncomment post
    await CommentService.uncomment({
      resourceType: CommentTypeEnum.post,
      resourceId: room.getDataValue('postId'),
      userId,
      commentId,
    });
  }

  /**
   * Get all comments of room.
   */
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'id',
    order = OrderEnum.desc,
    roomId,
  }: CommentsListParams): CommentListResult {
    // get room model
    const room = await RoomService.getById({ id: roomId }, false);
    if (!room) {
      throw new ResourceNotFoundError({
        message: 'Room not found.',
      });
    }

    // get all comments by post id
    const comments = await CommentService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      resourceType: CommentTypeEnum.post,
      resourceId: room.getDataValue('postId'),
    });

    return {
      data: comments,
      limit,
      offset,
    };
  }
}

export default RoomCommentController;
