import db from 'core/data/models';
import { TeamCreationAttributes } from 'core/data/models/Team';
import { SomethingWentWrong } from 'modules/exceptions';

import { TeamTypes } from '@ultras/utils';
import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import injectTeams, { RapidApiTeam } from 'core/data/inject-scripts/injectTeams';

enum Order {
  asc = 'asc',
  desc = 'desc',
}

import {
  GetAllTeamsActionParams,
  GetAllTeamsActionResult,
  InjectTeamsDataResult,
  GetTeamByIdResult,
} from './types';

class TeamController {
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'id',
    order = Order.asc,
    name,
    countryId,
    cityId,
  }: GetAllTeamsActionParams): Promise<GetAllTeamsActionResult> {
    let nameQuery = null;
    let countryIdQuery: any = null;
    let cityIdQuery: any = null;
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
    if (cityId) {
      cityIdQuery = {
        cityId: cityId,
      };
    }

    if (nameQuery && (countryIdQuery || cityIdQuery)) {
      query = {
        [db.Sequelize.Op.and]: [nameQuery],
      };

      if (countryIdQuery) {
        query[db.Sequelize.Op.and].push(countryIdQuery);
      }
      if (cityIdQuery) {
        query[db.Sequelize.Op.and].push(cityIdQuery);
      }
    } else if (countryIdQuery && cityIdQuery) {
      query = {
        [db.Sequelize.Op.and]: [countryIdQuery, cityIdQuery],
      };
    } else {
      if (countryIdQuery) {
        query = countryIdQuery;
      } else if (cityIdQuery) {
        query = cityIdQuery;
      } else {
        query = nameQuery;
      }
    }

    const { rows, count } = await db.Team.findAndCountAll({
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

  static async getById(id: number): Promise<GetTeamByIdResult> {
    const Team = await db.Team.findByPk(id);

    return {
      data: Team,
    };
  }

  /**
   * used to development purposes
   */
  static async inject(): Promise<InjectTeamsDataResult> {
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
        } = await injectTeams(country.getDataValue('name'));

        if (response.length === 0) {
          continue;
        }

        const records: TeamCreationAttributes[] = [];
        for (const responseItem of response) {
          const item: RapidApiTeam = responseItem as RapidApiTeam;
          if (!item.team.name) {
            continue;
          }

          const venue = await db.Venue.findOne({
            where: {
              dataRapidId: { [db.Sequelize.Op.eq]: item.venue.id },
            },
            attributes: ['id', 'cityId'],
          });

          if (!venue) {
            console.log(`>>> missing in DB[venue]: ${item.venue.name}`);
            continue;
          }

          records.push({
            name: item.team.name,
            cityId: venue.getDataValue('cityId'),
            countryId: country.getDataValue('id'),
            venueId: venue.getDataValue('id'),
            founded: item.team.founded,
            logo: item.team.logo,
            type: item.team.national ? TeamTypes.national : TeamTypes.club,
            dataRapidId: item.team.id,
          });
        }

        await db.Team.bulkCreate(records);
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

export default TeamController;