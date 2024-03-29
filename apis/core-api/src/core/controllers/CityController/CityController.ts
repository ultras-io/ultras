import { OrderEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import { CityService, CountryService } from 'core/services';
import { ResourceNotFoundError } from 'modules/exceptions';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import { ResourceIdentifier } from 'types';

import {
  CitiesListParams,
  CitiesListResult,
  CityByIdResult,
  CitiesInjectDataResult,
} from './types';

class CityController extends BaseController {
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'name',
    order = OrderEnum.asc,
    name,
    countryId,
  }: CitiesListParams): CitiesListResult {
    const { rows, count } = await CityService.getAll({
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

  static async getById(id: ResourceIdentifier): CityByIdResult {
    const city = await CityService.getById(id);

    if (!city) {
      throw new ResourceNotFoundError({
        message: 'City not found.',
      });
    }

    return {
      data: city,
    };
  }

  /**
   * NOTICE: used to development purposes
   */
  static async inject(): CitiesInjectDataResult {
    const countries = await CountryService.getCodesAndIds();

    for (const country of countries) {
      try {
        await CityService.inject(country.dataValues.code, country.dataValues.id);
      } catch (e: any) {
        if (![429, 404].includes(e.status)) {
          this.riseSomethingWrong(e, "API throws error or couldn't insert");
          return this.sendFailureStatus();
        }
      }
    }

    return this.sendSuccessStatus();
  }
}

export default CityController;
