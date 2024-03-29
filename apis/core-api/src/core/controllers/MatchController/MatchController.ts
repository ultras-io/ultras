// import { parseMatchStatus, OrderEnum, WinnerEnum } from '@ultras/utils';
import { OrderEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import { MatchService } from 'core/services';
import { ResourceNotFoundError } from 'modules/exceptions';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import { ResourceIdentifier } from 'types';

import {
  MatchesListParams,
  MatchesListResult,
  MatchByIdResult,
  MatchesInjectDataResult,
  MatchByIdParams,
} from './types';

class MatchController extends BaseController {
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'id',
    order = OrderEnum.asc,
    search,
    dateFrom,
    dateTo,
    leagueId,
    venueId,
    teamId,
    teamHomeId,
    teamAwayId,
    userId,
  }: MatchesListParams): MatchesListResult {
    const { rows, count } = await MatchService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      search,
      dateFrom,
      dateTo,
      leagueId,
      venueId,
      teamId,
      teamHomeId,
      teamAwayId,
      userId,
    });

    return {
      data: rows,
      count,
      limit,
      offset,
    };
  }

  static async getById({ id, userId }: MatchByIdParams): MatchByIdResult {
    const match = await MatchService.getById({ id, userId });

    if (!match) {
      throw new ResourceNotFoundError({
        message: 'Match not found.',
      });
    }

    return {
      data: match,
    };
  }

  /**
   * NOTICE: used to development purposes
   */
  static async injectByDate(date: string): MatchesInjectDataResult {
    try {
      await MatchService.injectByDate(date);
      return this.sendSuccessStatus();
    } catch (e: any) {
      this.riseSomethingWrong(e, "API throws error or couldn't insert");
      return this.sendFailureStatus();
    }
  }

  /**
   * NOTICE: used to development purposes
   */
  static async injectBySeason(season: string): MatchesInjectDataResult {
    try {
      await MatchService.injectBySeason(season);
      return this.sendSuccessStatus();
    } catch (e: any) {
      this.riseSomethingWrong(e, "API throws error or couldn't insert");
      return this.sendFailureStatus();
    }
  }
}

export default MatchController;
