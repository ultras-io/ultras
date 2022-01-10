import db from 'core/data/models';
import { LeagueCreationAttributes } from 'core/data/models/League';
import { SomethingWentWrong } from 'modules/exceptions';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import injectLeagues, { RapidApiLeague } from 'core/data/inject-scripts/injectLeagues';

enum Order {
  asc = 'asc',
  desc = 'desc',
}

import {
  GetAllLeaguesActionParams,
  GetAllLeaguesActionResult,
  InjectLeaguesDataResult,
  GetLeagueByIdResult,
} from './types';

class LeagueController {
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'id',
    order = Order.asc,
    name,
    countryId,
  }: GetAllLeaguesActionParams): Promise<GetAllLeaguesActionResult> {
    let nameQuery = null;
    let countryIdQuery: any = null;
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

    const { rows, count } = await db.League.findAndCountAll({
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

  static async getById(id: number): Promise<GetLeagueByIdResult> {
    const League = await db.League.findByPk(id);

    return {
      data: League,
    };
  }

  /**
   * used to development purposes
   */
  static async inject(): Promise<InjectLeaguesDataResult> {
    // inject here
    try {
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
        attributes: ['name', 'id'],
        order: [['name', Order.asc]],
      });

      for (const country of countries) {
        const {
          body: { response },
        } = await injectLeagues(country.getDataValue('name'));

        if (response.length === 0) {
          continue;
        }

        const records: LeagueCreationAttributes[] = [];
        for (const responseItem of response) {
          const item: RapidApiLeague = responseItem as RapidApiLeague;
          if (!item.league.name) {
            continue;
          }

          records.push({
            name: item.league.name,
            countryId: country.getDataValue('id'),
            logo: item.league.logo,
            dataRapidId: item.league.id,
          });
        }

        await db.League.bulkCreate(records);
      }

      return { data: { success: true } };
    } catch (e: any) {
      throw new SomethingWentWrong({
        message: "Api throws error or couldn't insert",
        originalMessage: e?.message,
      });
    }
  }
}

export default LeagueController;
