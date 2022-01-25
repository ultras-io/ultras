import { OrderEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import { LeagueService, CountryService } from 'services';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import { DbIdentifier } from 'types';

import {
  LeaguesListParams,
  LeaguesListResult,
  LeagueByIdResult,
  LeaguesInjectDataResult,
} from './types';

class LeagueController extends BaseController {
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'id',
    order = OrderEnum.asc,
    name,
    countryId,
  }: LeaguesListParams): LeaguesListResult {
    const { rows, count } = await LeagueService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      name,
      countryId,
    });

    return {
      data: rows,
      count,
      limit,
      offset,
    };
  }

  static async getById(id: DbIdentifier): LeagueByIdResult {
    const league = await LeagueService.getById(id);

    return {
      data: league,
    };
  }

  /**
   * NOTICE: used to development purposes
   */
  static async inject(): LeaguesInjectDataResult {
    const countries = await CountryService.getCodesAndIds();

    try {
      for (const country of countries) {
        await LeagueService.inject(
          country.getDataValue('name'),
          country.getDataValue('id')
        );
      }

      return this.sendSuccessStatus();
    } catch (e: any) {
      this.riseSomethingWrong(e, "API throws error or couldn't insert");
      return this.sendFailureStatus();
    }
  }
}

export default LeagueController;
