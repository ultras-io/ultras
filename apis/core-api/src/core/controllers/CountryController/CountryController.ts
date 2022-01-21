import { OrderEnum } from '@ultras/utils';
import BaseController from 'abstraction/BaseController';
import { CountryService } from 'services';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import { DbIdentifier } from 'types';
import {
  CountriesListParams,
  CountriesListResult,
  CountryByIdResult,
  CountriesInjectDataResult,
} from './types';

class CountryController extends BaseController {
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'name',
    order = OrderEnum.asc,
    name,
    code,
  }: CountriesListParams): CountriesListResult {
    const { rows, count } = await CountryService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      name,
      code,
    });

    return {
      data: rows,
      count,
      limit,
      offset,
    };
  }

  static async getById(id: DbIdentifier): CountryByIdResult {
    const country = await CountryService.getById(id);

    return {
      data: country,
    };
  }

  /**
   * NOTICE: used to development purposes
   */
  static async inject(): CountriesInjectDataResult {
    try {
      await CountryService.inject();
      return this.sendSuccessStatus();
    } catch (e: any) {
      this.riseSomethingWrong(e, "API throws error or couldn't insert");
      return this.sendFailureStatus();
    }
  }
}

export default CountryController;
