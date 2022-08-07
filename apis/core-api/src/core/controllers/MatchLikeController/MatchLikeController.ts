import { LikeTypeEnum, OrderEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import { MatchService, LikeService } from 'core/services';
import { ResourceNotFoundError } from 'modules/exceptions';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import type { LikesListParams, LikeListResult, LikeUnlikeParamsInterface } from './types';

class MatchLikeController extends BaseController {
  /**
   * Make match liked by user.
   */
  static async create({ userId, matchId }: LikeUnlikeParamsInterface) {
    // get match model
    const match = await MatchService.getById(matchId);
    if (!match) {
      throw new ResourceNotFoundError({
        message: 'Match not found.',
      });
    }

    // like match
    await LikeService.like({
      resourceType: LikeTypeEnum.match,
      resourceId: matchId,
      userId,
    });
  }

  /**
   * Make match un-liked by user.
   */
  static async delete({ userId, matchId }: LikeUnlikeParamsInterface) {
    // get match model
    const match = await MatchService.getById(matchId);
    if (!match) {
      throw new ResourceNotFoundError({
        message: 'Match not found.',
      });
    }

    // unlike match
    await LikeService.unlike({
      resourceType: LikeTypeEnum.match,
      resourceId: matchId,
      userId,
    });
  }

  /**
   * Get all likes of match.
   */
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'username',
    order = OrderEnum.asc,
    matchId,
  }: LikesListParams): LikeListResult {
    // get match model
    const match = await MatchService.getById(matchId);
    if (!match) {
      throw new ResourceNotFoundError({
        message: 'Match not found.',
      });
    }

    // get all likes by match id
    const likes = await LikeService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      resourceType: LikeTypeEnum.match,
      resourceId: matchId,
    });

    return {
      data: likes,
      limit,
      offset,
    };
  }
}

export default MatchLikeController;
