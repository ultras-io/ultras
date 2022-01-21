import { TeamTypesEnum } from '@ultras/utils';
import {
  ServiceListParamsType,
  ServiceListResultType,
  ServiceByIdResultType,
  DbIdentifier,
} from 'types';

import BaseService from 'abstraction/BaseService';
import resources from 'core/data/lcp';
import db from 'core/data/models';
import { TeamAttributes, TeamCreationAttributes } from 'core/data/models/Team';
import injectTeams, { RapidApiTeam } from 'core/data/inject-scripts/injectTeams';

export interface TeamsListParamsInterface {
  name?: string;
  countryId?: DbIdentifier;
  cityId?: DbIdentifier;
  venueId?: DbIdentifier;
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

  static async getAll(
    params: ServiceListParamsType<TeamsListParamsInterface>
  ): ServiceListResultType<TeamAttributes> {
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

    return this.findAndCountAll(db.Team, query, params);
  }

  static async getById(id: DbIdentifier): ServiceByIdResultType<TeamAttributes> {
    return this.findById(db.Team, id);
  }

  static async inject(countryName: string, countryId: DbIdentifier) {
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
        console.log(`>>> missing in DB[venue]: ${item.venue.name}`);
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
    await db.Team.bulkCreate(uniqueTeams);
  }
}

export default TeamService;
