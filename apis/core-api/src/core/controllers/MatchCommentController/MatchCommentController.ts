import { CommentTypeEnum, OrderEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import { MatchService, CommentService } from 'core/services';
import { ResourceNotFoundError } from 'modules/exceptions';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import type {
  CommentsListParams,
  CommentListResult,
  ICommentCreateParams,
  ICommentUpdateParams,
  ICommentDeleteParams,
} from './types';

class MatchCommentController extends BaseController {
  /**
   * Add comment under match.
   */
  static async create({ userId, matchId, content }: ICommentCreateParams) {
    // get match model
    const match = await MatchService.getById({ id: matchId });
    if (!match) {
      throw new ResourceNotFoundError({
        message: 'Match not found.',
      });
    }

    // add comment under match
    const comment = await CommentService.comment({
      resourceType: CommentTypeEnum.match,
      resourceId: matchId,
      userId,
      content,
    });

    return comment;
  }

  /**
   * Update comment under match.
   */
  static async update({ userId, matchId, commentId, content }: ICommentUpdateParams) {
    // get match model
    const match = await MatchService.getById({ id: matchId });
    if (!match) {
      throw new ResourceNotFoundError({
        message: 'Match not found.',
      });
    }

    // update comment under match
    const comment = await CommentService.update({
      resourceType: CommentTypeEnum.match,
      resourceId: matchId,
      userId,
      commentId,
      content,
    });

    return comment;
  }

  /**
   * Make match uncaught by user.
   */
  static async delete({ userId, matchId, commentId }: ICommentDeleteParams) {
    // get match model
    const match = await MatchService.getById({ id: matchId });
    if (!match) {
      throw new ResourceNotFoundError({
        message: 'Match not found.',
      });
    }

    // uncomment match
    await CommentService.uncomment({
      resourceType: CommentTypeEnum.match,
      resourceId: matchId,
      userId,
      commentId,
    });
  }

  /**
   * Get all comments of match.
   */
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'id',
    order = OrderEnum.desc,
    matchId,
  }: CommentsListParams): CommentListResult {
    // get match model
    const match = await MatchService.getById({ id: matchId });
    if (!match) {
      throw new ResourceNotFoundError({
        message: 'Match not found.',
      });
    }

    // get all comments by match id
    const comments = await CommentService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      resourceType: CommentTypeEnum.match,
      resourceId: matchId,
    });

    return {
      data: comments,
      limit,
      offset,
    };
  }
}

export default MatchCommentController;
