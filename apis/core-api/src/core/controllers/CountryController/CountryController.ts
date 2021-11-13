import db from 'core/data/models';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import injectCountries, {
  RapidApiCountry,
} from 'core/data/inject-scripts/injectCountries';

enum Order {
  asc = 'asc',
  desc = 'desc',
}

import {
  GetAllCountriesActionParams,
  GetAllCountriesActionResult,
  InjectCountriesDataResult,
  GetCountryByIdResult,
} from './types';
import { SomethingWentWrong } from 'modules/exceptions';
import { CountryCreationAttributes } from 'core/data/models/Country';

class CountryController {
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'name',
    order = Order.asc,
    name,
    code,
  }: GetAllCountriesActionParams): Promise<GetAllCountriesActionResult> {
    let nameQuery = null;
    let codeQuery = null;
    let query = null;

    if (name) {
      nameQuery = {
        name: {
          [db.Sequelize.Op.iLike]: `%${name}%`,
        },
      };
    }
    if (code) {
      codeQuery = {
        code,
      };
    }

    if (nameQuery && codeQuery) {
      query = {
        [db.Sequelize.Op.and]: [nameQuery, codeQuery],
      };
    } else {
      if (codeQuery) {
        query = codeQuery;
      } else {
        query = nameQuery;
      }
    }

    const { rows, count } = await db.Country.findAndCountAll({
      limit,
      offset,
      where: query,
      order: [[orderAttr, order]],
    });

    return {
      data: rows,
      count,
      limit,
      offset,
    };
  }

  static async getById(id: number): Promise<GetCountryByIdResult> {
    const country = await db.Country.findByPk(id);

    return {
      data: country,
    };
  }
  /**
   * used to development purposes
   */
  static async inject(): Promise<InjectCountriesDataResult> {
    // inject here
    try {
      const {
        body: { response },
      } = await injectCountries();
      const records: CountryCreationAttributes[] = [];

      response.forEach((item: RapidApiCountry) => {
        records.push({
          name: item.name,
          code: item.code,
          flag: item.flag,
          rapId: item.id,
        });
      });

      await db.Country.bulkCreate(records);
      return { data: { success: true } };
    } catch (e: any) {
      throw new SomethingWentWrong({
        message: "Api throws error or couldn't insert",
        originalMessage: e?.message,
      });
    }
  }
}

export default CountryController;
