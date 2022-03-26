import { VenueViewModel } from '@ultras/view-models';
import {
  ServiceListParamsType,
  ServiceListResultType,
  ServiceByIdResultType,
  DbIdentifier,
} from 'types';

import resources from 'core/data/lcp';
import db from 'core/data/models';
import { VenueCreationAttributes } from 'core/data/models/Venue';
import injectVenues, { RapidApiVenue } from 'core/data/inject-scripts/injectVenues';

import BaseService from './BaseService';

export interface VenuesListParamsInterface {
  name?: string;
  countryId?: DbIdentifier;
  cityId?: DbIdentifier;
}

class VenueService extends BaseService {
  protected static includeRelations() {
    return {
      attributes: {
        exclude: ['countryId', 'cityId'],
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
      ],
    };
  }

  /**
   * Get venues by provided filter data and pagination.
   */
  static async getAll(
    params: ServiceListParamsType<VenuesListParamsInterface>
  ): ServiceListResultType<VenueViewModel> {
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

    return this.findAndCountAll(db.Venue, query, params);
  }

  /**
   * Get venue by their ID.
   */
  static async getById(id: DbIdentifier): ServiceByIdResultType<VenueViewModel> {
    return this.findById(db.Venue, id);
  }

  /**
   * Inject data from Rapid API.
   */
  static async inject(countryName: string, countryId: DbIdentifier) {
    const records: VenueCreationAttributes[] = [];
    const {
      body: { response },
    } = await injectVenues(countryName);

    if (response.length === 0) {
      return;
    }

    for (const responseItem of response) {
      const item: RapidApiVenue = responseItem as RapidApiVenue;
      if (!item.name) {
        continue;
      }

      const city = await db.City.findOne({
        where: {
          name: { [db.Sequelize.Op.eq]: item.city },
        },
        attributes: ['id'],
      });

      if (!city) {
        console.log(`>>> missing in DB[city]: ${item.city}`);
        continue;
      }

      records.push({
        name: item.name,
        address: item.address,
        capacity: item.capacity,
        cityId: city.getDataValue('id'),
        countryId: countryId,
        imageUri: item.image,
        dataRapidId: item.id,
      });
    }

    const uniqueVenuesGrouped = records.reduce(
      (acc: any, item: VenueCreationAttributes) => {
        acc[item.dataRapidId] = item;
        return acc;
      },
      {}
    );

    const uniqueVenues = Object.values(uniqueVenuesGrouped);
    await db.Venue.bulkCreate(uniqueVenues);
  }
}

export default VenueService;
