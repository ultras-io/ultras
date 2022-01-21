import {
  ServiceListParamsType,
  ServiceListResultType,
  ServiceByIdResultType,
  DbIdentifier,
} from 'types';

import BaseService from 'abstraction/BaseService';
import resources from 'core/data/lcp';
import db from 'core/data/models';
import { LeagueAttributes, LeagueCreationAttributes } from 'core/data/models/League';
import injectLeagues, { RapidApiLeague } from 'core/data/inject-scripts/injectLeagues';

export interface LeaguesListParamsInterface {
  name?: string;
  countryId?: DbIdentifier;
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

  static async getAll(
    params: ServiceListParamsType<LeaguesListParamsInterface>
  ): ServiceListResultType<LeagueAttributes> {
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

  static async getById(id: DbIdentifier): ServiceByIdResultType<LeagueAttributes> {
    return this.findById(db.League, id);
  }

  static async inject(countryName: string, countryId: DbIdentifier) {
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

    await db.League.bulkCreate(records);
  }
}

export default LeagueService;
