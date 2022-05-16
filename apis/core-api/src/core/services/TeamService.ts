import { TeamViewModel } from '@ultras/view-models';
import { TeamTypesEnum } from '@ultras/utils';
import {
  ServiceListParamsType,
  ServiceListResultType,
  ServiceByIdResultType,
  ResourceIdentifier,
} from 'types';

import resources from 'core/data/lcp';
import db from 'core/data/models';
import { TeamCreationAttributes } from 'core/data/models/Team';
import injectTeams, { RapidApiTeam } from 'core/data/inject-scripts/injectTeams';

import BaseService from './BaseService';

export interface TeamsListParamsInterface {
  name?: string;
  countryId?: ResourceIdentifier;
  cityId?: ResourceIdentifier;
  venueId?: ResourceIdentifier;
  type?: TeamTypesEnum;
}

class TeamService extends BaseService {
  protected static includeRelations() {
    return {
      attributes: {
        exclude: ['countryId', 'cityId', 'venueId'],
      },
      include: [
        {
          model: db.Country,
          as: resources.COUNTRY.ALIAS.SINGULAR,
        },
        {
          model: db.City,
          as: resources.CITY.ALIAS.SINGULAR,
        },
        {
          model: db.Venue,
          as: resources.VENUE.ALIAS.SINGULAR,
        },
      ],
    };
  }

  /**
   * Get teams by provided filter data and pagination.
   */
  static async getAll(
    params: ServiceListParamsType<TeamsListParamsInterface>
  ): ServiceListResultType<TeamViewModel> {
    const query: any = this.queryInit();

    if (params.name) {
      this.queryAppend(query, 'name', {
        [db.Sequelize.Op.iLike]: `%${params.name}%`,
      });
    }

    if (params.countryId) {
      this.queryAppend(query, 'countryId', {
        [db.Sequelize.Op.eq]: params.countryId,
      });
    }

    if (params.cityId) {
      this.queryAppend(query, 'cityId', {
        [db.Sequelize.Op.eq]: params.cityId,
      });
    }

    if (params.venueId) {
      this.queryAppend(query, 'venueId', {
        [db.Sequelize.Op.eq]: params.venueId,
      });
    }

    if (params.type) {
      this.queryAppend(query, 'type', {
        [db.Sequelize.Op.eq]: params.type,
      });
    }

    return this.findAndCountAll(db.Team, query, params);
  }

  /**
   * Get team by their ID.
   */
  static async getById(id: ResourceIdentifier): ServiceByIdResultType<TeamViewModel> {
    return this.findById(db.Team, id);
  }

  /**
   * Inject data from Rapid API.
   */
  static async inject(countryName: string, countryId: ResourceIdentifier) {
    const records: Array<TeamCreationAttributes> = [];
    const {
      body: { response },
    } = await injectTeams(countryName);

    if (response.length === 0) {
      return;
    }

    for (const responseItem of response) {
      const item: RapidApiTeam = responseItem as RapidApiTeam;
      if (!item.team.name) {
        continue;
      }

      const venue = await db.Venue.findOne({
        where: {
          dataRapidId: {
            [db.Sequelize.Op.eq]: item.venue.id,
          },
        },
        attributes: ['id', 'cityId'],
      });

      if (!venue) {
        console.log(`>>> missing in DB[venue]:`, {
          venue: item.venue.name,
          team: item.team.name,
        });
        continue;
      }

      records.push({
        name: item.team.name,
        cityId: venue.getDataValue('cityId'),
        countryId: countryId,
        venueId: venue.getDataValue('id'),
        founded: item.team.founded,
        logo: item.team.logo,
        type: item.team.national ? TeamTypesEnum.national : TeamTypesEnum.club,
        dataRapidId: item.team.id,
      });
    }

    const uniqueTeamsGrouped = records.reduce(
      (acc: any, item: TeamCreationAttributes) => {
        acc[item.dataRapidId] = item;
        return acc;
      },
      {}
    );

    const uniqueTeams = Object.values(uniqueTeamsGrouped);
    await db.Team.bulkCreate(uniqueTeams, {
      ignoreDuplicates: true,
    });
  }
}

export default TeamService;
