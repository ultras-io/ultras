import db from 'core/data/models';
import { OrderEnum } from '@ultras/utils';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';

import {
  GetAllCitiesActionResult,
  GetAllCitiesActionParams,
  InjectCitiesDataResult,
  GetCityByIdResult,
} from './types';
import { SomethingWentWrong } from 'modules/exceptions';
import { CityCreationAttributes } from 'core/data/models/City';
import getCountryCities from 'core/data/inject-scripts/injectCities';
import resources from 'core/data/lcp';

class CityController {
  private static includeRelations = {
    attributes: {
      exclude: ['countryId'],
    },
    include: [
      {
        model: db.Country,
        as: resources.COUNTRY.ALIAS.SINGULAR,
      },
    ],
  };

  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'name',
    order = OrderEnum.asc,
    name,
    countryId,
  }: GetAllCitiesActionParams): Promise<GetAllCitiesActionResult> {
    let nameQuery = null;
    let countryIdQuery = null;
    let query = null;

    if (name) {
      nameQuery = {
        name: {
          [db.Sequelize.Op.iLike]: `%${name}%`,
        },
      };
    }
    if (countryId) {
      countryIdQuery = {
        countryId,
      };
    }

    if (nameQuery && countryIdQuery) {
      query = {
        [db.Sequelize.Op.and]: [nameQuery, countryIdQuery],
      };
    } else {
      if (countryIdQuery) {
        query = countryIdQuery;
      } else {
        query = nameQuery;
      }
    }

    const { rows, count } = await db.City.findAndCountAll({
      limit,
      offset,
      where: query,
      order: [[orderAttr, order]],
      ...this.includeRelations,
    });

    return {
      data: rows,
      count,
      limit,
      offset,
    };
  }

  static async getById(id: number): Promise<GetCityByIdResult> {
    const city = await db.City.findByPk(id, {
      ...this.includeRelations,
    });

    return {
      data: city,
    };
  }
  /**
   * used to development purposes
   */
  static async inject(): Promise<InjectCitiesDataResult> {
    const excludedCountryCodes = ['AW', 'XK', 'PS', 'GP', 'GI', 'FO', 'CW', 'BM'];
    const excludedCountriesQuery = excludedCountryCodes.map(country => ({
      code: { [db.Sequelize.Op.ne]: country },
    }));

    const countries = await db.Country.findAll({
      where: {
        [db.Sequelize.Op.and]: [
          {
            name: { [db.Sequelize.Op.ne]: 'World' },
          },
          ...excludedCountriesQuery,
        ],
      },
      attributes: ['code', 'id'],
      order: [['code', OrderEnum.asc]],
    });

    let citiesToInject: CityCreationAttributes[] = [];
    for (const country of countries) {
      try {
        const cities = await getCountryCities(
          country.dataValues.code,
          country.dataValues.id
        );

        citiesToInject = [...citiesToInject, ...cities];
      } catch (e: any) {
        if (![429, 404].includes(e.status)) {
          throw new SomethingWentWrong({
            message: "Api throws error or couldn't insert",
            originalMessage: e?.message,
          });
        }
      }
    }

    const uniqueCitiesGrouped = citiesToInject.reduce(
      (acc: any, item: CityCreationAttributes) => {
        acc[item.dataRapidId] = item;
        return acc;
      },
      {}
    );

    const uniqueCities = Object.values(uniqueCitiesGrouped);
    await db.City.bulkCreate(uniqueCities);

    return { data: { success: true } };
  }
}

export default CityController;
