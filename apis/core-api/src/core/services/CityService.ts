import { CityViewModel } from '@ultras/view-models';
import {
  ServiceListParamsType,
  ServiceListResultType,
  ServiceByIdResultType,
  ResourceIdentifier,
} from 'types';

import resources from 'core/data/lcp';
import db from 'core/data/models';
import { CityCreationAttributes } from 'core/data/models/City';
import injectCities, { RapidApiCity } from 'core/data/inject-scripts/injectCities';
import BaseService from './BaseService';

export interface CitiesListParamsInterface {
  name?: string;
  countryId?: ResourceIdentifier;
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

  /**
   * Get cities by provided filter data and pagination.
   */
  static async getAll(
    params: ServiceListParamsType<CitiesListParamsInterface>
  ): ServiceListResultType<CityViewModel> {
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

  /**
   * Get city by their ID.
   */
  static async getById(id: ResourceIdentifier): ServiceByIdResultType<CityViewModel> {
    return this.findById(db.City, id);
  }

  /**
   * Inject data from Rapid API.
   */
  static async inject(countryCode: string, countryId: ResourceIdentifier) {
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
    await db.City.bulkCreate(uniqueCities, {
      ignoreDuplicates: true,
    });
  }
}

export default CityService;
