import { OrderEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import { CountryService, TeamService } from 'core/services';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import { DbIdentifier } from 'types';

import {
  TeamsListParams,
  TeamsListResult,
  TeamByIdResult,
  TeamsInjectDataResult,
} from './types';

class TeamController extends BaseController {
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'id',
    order = OrderEnum.asc,
    name,
    countryId,
    cityId,
    venueId,
  }: TeamsListParams): TeamsListResult {
    const { rows, count } = await TeamService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      name,
      countryId,
      cityId,
      venueId,
    });

    return {
      data: rows,
      count,
      limit,
      offset,
    };
  }

  static async getById(id: DbIdentifier): TeamByIdResult {
    const team = await TeamService.getById(id);

    return {
      data: team,
    };
  }

  /**
   * NOTICE: used to development purposes
   */
  static async inject(): TeamsInjectDataResult {
    try {
      const countries = await CountryService.getCodesAndIds();

      for (const country of countries) {
        await TeamService.inject(
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

export default TeamController;
