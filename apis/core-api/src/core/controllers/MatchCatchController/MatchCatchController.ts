import { CatchTypeEnum, OrderEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import { MatchService, CatchService } from 'core/services';
import { ResourceNotFoundError } from 'modules/exceptions';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import type { CatchListParams, CatchListResult, ICatchUncatchParams } from './types';

class MatchCatchController extends BaseController {
  /**
   * Make match caught by user.
   */
  static async create({ userId, matchId }: ICatchUncatchParams) {
    // get match model
    const match = await MatchService.getById({ id: matchId });
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
  static async delete({ userId, matchId }: ICatchUncatchParams) {
    // get match model
    const match = await MatchService.getById({ id: matchId });
    if (!match) {
      throw new ResourceNotFoundError({
        message: 'Match not found.',
      });
    }

    // non-catch match
    await CatchService.uncatch({
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
    userId,
  }: CatchListParams): CatchListResult {
    // get match model
    const match = await MatchService.getById({ id: matchId });
    if (!match) {
      throw new ResourceNotFoundError({
        message: 'Match not found.',
      });
    }

    // get all catches by match id
    const { rows, count } = await CatchService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      resourceType: CatchTypeEnum.match,
      resourceId: matchId,
    });

    return {
      data: rows,
      count,
      limit,
      offset,
    };
  }
}

export default MatchCatchController;
