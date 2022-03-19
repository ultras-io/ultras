import { OrderEnum } from '@ultras/utils';
import { CountryViewModel } from '@ultras/view-models';
import {
  ServiceListParamsType,
  ServiceListResultType,
  ServiceByIdResultType,
  DbIdentifier,
} from 'types';

import db from 'core/data/models';
import { CountryCreationAttributes } from 'core/data/models/Country';
import injectCountries, {
  RapidApiCountry,
} from 'core/data/inject-scripts/injectCountries';

import BaseService from './BaseService';

export interface CountriesListParamsInterface {
  name?: string;
  code?: string;
}

class CountryService extends BaseService {
  static async getAll(
    params: ServiceListParamsType<CountriesListParamsInterface>
  ): ServiceListResultType<CountryViewModel> {
    const query: any = this.queryInit();

    if (params.name) {
      this.queryAppend(query, 'name', {
        [db.Sequelize.Op.iLike]: `%${params.name}%`,
      });
    }

    if (params.code) {
      this.queryAppend(query, 'code', {
        [db.Sequelize.Op.eq]: params.code,
      });
    }

    return this.findAndCountAll(db.Country, query, params);
  }

  static async getById(id: DbIdentifier): ServiceByIdResultType<CountryViewModel> {
    return this.findById(db.Country, id);
  }

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

    await db.Country.bulkCreate(records);
  }
}

export default CountryService;
