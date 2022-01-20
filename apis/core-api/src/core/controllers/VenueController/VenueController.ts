import { OrderEnum } from '@ultras/utils';
import BaseController from 'base/BaseController';
import { VenueService, CountryService } from 'services';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import { DbIdentifier } from 'types';

import {
  VenuesListParams,
  VenuesListResult,
  VenueByIdResult,
  VenuesInjectDataResult,
} from './types';

class VenueController extends BaseController {
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'id',
    order = OrderEnum.asc,
    name,
    countryId,
    cityId,
  }: VenuesListParams): VenuesListResult {
    const { rows, count } = await VenueService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      name,
      countryId,
      cityId,
    });

    return {
      data: rows,
      count,
      limit,
      offset,
    };
  }

  static async getById(id: DbIdentifier): VenueByIdResult {
    const venue = await VenueService.getById(id);

    return {
      data: venue,
    };
  }

  /**
   * NOTICE: used to development purposes
   */
  static async inject(): VenuesInjectDataResult {
    const countries = await CountryService.getCodesAndIds();

    try {
      for (const country of countries) {
        await VenueService.inject(
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

export default VenueController;
