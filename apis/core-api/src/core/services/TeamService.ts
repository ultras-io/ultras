import { TeamViewModel } from '@ultras/view-models';
import { OrderEnum, TeamTypesEnum } from '@ultras/utils';
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

import BaseService, { RelationGroupType } from './BaseService';
import CountryService from './CountryService';
import CityService from './CityService';
import VenueService from './VenueService';

export interface ITeamsListParams {
  name?: string;
  countryId?: ResourceIdentifier;
  cityId?: ResourceIdentifier;
  venueId?: ResourceIdentifier;
  type?: TeamTypesEnum;
}

export const defaultRelations: RelationGroupType = ['city', 'country', 'venue'];

class TeamService extends BaseService {
  protected static includeRelations(relations: RelationGroupType = defaultRelations) {
    relations = relations || defaultRelations;
    const includeRelations = [];

    if (this.isRelationIncluded(relations, 'city')) {
      const relationsHierarchy = this.getRelationsHierarchy(relations, {
        city: ['country'],
      });

      includeRelations.push({
        model: db.City,
        as: resources.CITY.ALIAS.SINGULAR,
        ...CityService.getIncludeRelations(relationsHierarchy),
      });
    }

    if (this.isRelationIncluded(relations, 'country')) {
      includeRelations.push({
        model: db.Country,
        as: resources.COUNTRY.ALIAS.SINGULAR,
        ...CountryService.getIncludeRelations(),
      });
    }

    if (this.isRelationIncluded(relations, 'venue')) {
      const relationsHierarchy = this.getRelationsHierarchy(relations, {
        venue: ['country', 'city', 'city.country'],
      });

      includeRelations.push({
        model: db.Venue,
        as: resources.VENUE.ALIAS.SINGULAR,
        ...VenueService.getIncludeRelations(relationsHierarchy),
      });
    }

    return {
      include: includeRelations,
    };
  }

  /**
   * Get teams by provided filter data and pagination.
   */
  static async getAll(
    params: ServiceListParamsType<ITeamsListParams>
  ): ServiceListResultType<TeamViewModel> {
    const query: any = this.queryInit();

    if (params.name) {
      this.queryAppend(query, 'name', {
        [db.Sequelize.Op.iLike]: `${params.name}%`,
      });
    }

    if (params.countryId) {
      this.queryArrayOrSingle(query, 'countryId', params.countryId);
    }

    if (params.cityId) {
      this.queryArrayOrSingle(query, 'cityId', params.cityId);
    }

    if (params.venueId) {
      this.queryArrayOrSingle(query, 'venueId', params.venueId);
    }

    if (params.type) {
      this.queryAppend(query, 'type', {
        [db.Sequelize.Op.eq]: params.type,
      });
    }

    // set alphabetical ordering
    if (!params.orderAttr) {
      params.orderAttr = 'name';
      params.order = OrderEnum.asc;
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
