import {
  ServiceListParamsType,
  ServiceListResultType,
  ServiceByIdResultType,
  DbIdentifier,
} from 'types';

import BaseService from 'base/BaseService';
import resources from 'core/data/lcp';
import db from 'core/data/models';
import { CityAttributes, CityCreationAttributes } from 'core/data/models/City';
import injectCities, { RapidApiCity } from 'core/data/inject-scripts/injectCities';

export interface CitiesListParamsInterface {
  name?: string;
  countryId?: DbIdentifier;
}

class CityService extends BaseService {
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
    params: ServiceListParamsType<CitiesListParamsInterface>
  ): ServiceListResultType<CityAttributes> {
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

    return this.findAndCountAll(db.City, query, params);
  }

  static async getById(id: DbIdentifier): ServiceByIdResultType<CityAttributes> {
    return this.findById(db.City, id);
  }

  static async inject(countryCode: string, countryId: DbIdentifier) {
    const {
      body: { data },
    } = await injectCities(countryCode);

    const cities: Array<CityCreationAttributes> = data.map((item: RapidApiCity) => ({
      name: item.name,
      dataRapidId: item.id,
      countryId,
    }));

    const uniqueCitiesGrouped = cities.reduce(
      (acc: any, item: CityCreationAttributes) => {
        acc[item.dataRapidId] = item;
        return acc;
      },
      {}
    );

    const uniqueCities = Object.values(uniqueCitiesGrouped);
    await db.City.bulkCreate(uniqueCities);
  }
}

export default CityService;
