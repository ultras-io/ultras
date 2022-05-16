import { LeagueViewModel } from '@ultras/view-models';
import {
  ServiceListParamsType,
  ServiceListResultType,
  ServiceByIdResultType,
  ResourceIdentifier,
} from 'types';

import resources from 'core/data/lcp';
import db from 'core/data/models';
import { LeagueCreationAttributes } from 'core/data/models/League';
import injectLeagues, { RapidApiLeague } from 'core/data/inject-scripts/injectLeagues';

import BaseService from './BaseService';

export interface LeaguesListParamsInterface {
  name?: string;
  countryId?: ResourceIdentifier;
}

class LeagueService extends BaseService {
  protected static includeRelations() {
    return {
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
  }

  /**
   * Get leagues by provided filter data and pagination.
   */
  static async getAll(
    params: ServiceListParamsType<LeaguesListParamsInterface>
  ): ServiceListResultType<LeagueViewModel> {
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

    return this.findAndCountAll(db.League, query, params);
  }

  /**
   * Get league by their ID.
   */
  static async getById(id: ResourceIdentifier): ServiceByIdResultType<LeagueViewModel> {
    return this.findById(db.League, id);
  }

  /**
   * Inject data from Rapid API.
   */
  static async inject(countryName: string, countryId: ResourceIdentifier) {
    const {
      body: { response },
    } = await injectLeagues(countryName);

    if (response.length === 0) {
      return;
    }

    const records: Array<LeagueCreationAttributes> = [];
    for (const responseItem of response) {
      const item: RapidApiLeague = responseItem as RapidApiLeague;
      if (!item.league.name) {
        continue;
      }

      records.push({
        name: item.league.name,
        countryId: countryId,
        logo: item.league.logo,
        dataRapidId: item.league.id,
      });
    }

    await db.League.bulkCreate(records, {
      ignoreDuplicates: true,
    });
  }
}

export default LeagueService;
