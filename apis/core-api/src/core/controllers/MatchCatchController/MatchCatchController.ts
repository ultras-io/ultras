import { CatchTypeEnum, OrderEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import { MatchService, CatchService } from 'core/services';
import { ResourceNotFoundError } from 'modules/exceptions';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import type { CatchListParams, CatchListResult, ICatchNonCatchParams } from './types';

class MatchCatchController extends BaseController {
  /**
   * Make match caught by user.
   */
  static async create({ userId, matchId }: ICatchNonCatchParams) {
    // get match model
    const match = await MatchService.getById(matchId);
    if (!match) {
      throw new ResourceNotFoundError({
        message: 'Match not found.',
      });
    }

    // catch match
    await CatchService.catch({
      resourceType: CatchTypeEnum.match,
      resourceId: matchId,
      userId,
    });
  }

  /**
   * Make match uncaught by user.
   */
  static async delete({ userId, matchId }: ICatchNonCatchParams) {
    // get match model
    const match = await MatchService.getById(matchId);
    if (!match) {
      throw new ResourceNotFoundError({
        message: 'Match not found.',
      });
    }

    // non-catch match
    await CatchService.nonCatch({
      resourceType: CatchTypeEnum.match,
      resourceId: matchId,
      userId,
    });
  }

  /**
   * Get all catches of match.
   */
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'username',
    order = OrderEnum.asc,
    matchId,
  }: CatchListParams): CatchListResult {
    // get match model
    const match = await MatchService.getById(matchId);
    if (!match) {
      throw new ResourceNotFoundError({
        message: 'Match not found.',
      });
    }

    // get all catches by match id
    const catches = await CatchService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      resourceType: CatchTypeEnum.match,
      resourceId: matchId,
    });

    return {
      data: catches,
      limit,
      offset,
    };
  }
}

export default MatchCatchController;
