import { CountryViewModel } from '@ultras/view-models';
import { OrderEnum } from '@ultras/utils';
import {
  ServiceListParamsType,
  ServiceListResultType,
  ServiceByIdResultType,
  ResourceIdentifier,
} from 'types';

import db from 'core/data/models';
import { CountryCreationAttributes } from 'core/data/models/Country';
import injectCountries, {
  RapidApiCountry,
} from 'core/data/inject-scripts/injectCountries';

import BaseService from './BaseService';
import S3Service from './aws/S3Service';

export interface ICountriesListParams {
  name?: string;
  code?: string;
}

class CountryService extends BaseService {
  /**
   * Get countries by provided filter data and pagination.
   */
  static async getAll(
    params: ServiceListParamsType<ICountriesListParams>
  ): ServiceListResultType<CountryViewModel> {
    const query: any = this.queryInit();

    if (params.name) {
      this.queryAppend(query, 'name', {
        [db.Sequelize.Op.iLike]: `${params.name}%`,
      });
    }

    // set alphabetical ordering
    if (!params.orderAttr) {
      params.orderAttr = 'name';
      params.order = OrderEnum.asc;
    }

    if (params.code) {
      this.queryArrayOrSingle(query, 'code', params.code);
    }

    return this.findAndCountAll(db.Country, query, params);
  }

  /**
   * Get country by their ID.
   */
  static async getById(id: ResourceIdentifier): ServiceByIdResultType<CountryViewModel> {
    return this.findById(db.Country, id);
  }

  /**
   * Get country code/id list.
   */
  static async getCodesAndIds() {
    const excludedCountryCodes = ['AW', 'XK', 'PS', 'GP', 'GI', 'FO', 'CW', 'BM'];
    const countries = await db.Country.findAll({
      where: {
        name: {
          [db.Sequelize.Op.ne]: 'World',
        },
        code: {
          [db.Sequelize.Op.notIn]: excludedCountryCodes,
        },
      },
      attributes: ['code', 'id'],
      order: [['code', OrderEnum.asc]],
    });

    return countries;
  }

  /**
   * Get country code/name/id list.
   */
  static async getCodesNamesAndIds() {
    const excludedCountryCodes = ['AW', 'XK', 'PS', 'GP', 'GI', 'FO', 'CW', 'BM'];
    const countries = await db.Country.findAll({
      where: {
        code: {
          [db.Sequelize.Op.or]: [
            {
              [db.Sequelize.Op.notIn]: excludedCountryCodes,
            },
            {
              [db.Sequelize.Op.is]: null,
            },
          ],
        },
      },
      attributes: ['name', 'code', 'id'],
      order: [['name', OrderEnum.asc]],
    });

    return countries;
  }

  /**
   * Inject data from Rapid API.
   */
  static async inject() {
    const {
      body: { response },
    } = await injectCountries();

    const records: Array<CountryCreationAttributes> = [];
    response.forEach((item: RapidApiCountry) => {
      records.push({
        name: item.name,
        code: item.code,
        flag: item.flag,
        dataRapidId: item.id,
      });
    });

    await db.Country.bulkCreate(records, {
      ignoreDuplicates: true,
    });

    const phoneCodesJson = await S3Service.getFileContent('countries.json');
    if (!phoneCodesJson) {
      return;
    }

    const countryPhoneCodes = JSON.parse(phoneCodesJson);
    for (const countryCode in countryPhoneCodes) {
      await db.Country.update(
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          telPrefix: countryPhoneCodes[countryCode],
        },
        {
          where: {
            code: countryCode,
          },
          limit: 1,
        }
      );
    }
  }
}

export default CountryService;
