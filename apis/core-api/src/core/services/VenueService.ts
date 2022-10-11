import { VenueViewModel } from '@ultras/view-models';
import { OrderEnum } from '@ultras/utils';
import {
  ServiceListParamsType,
  ServiceListResultType,
  ServiceByIdResultType,
  ResourceIdentifier,
} from 'types';

import resources from 'core/data/lcp';
import db from 'core/data/models';
import { VenueCreationAttributes } from 'core/data/models/Venue';
import injectVenues, { RapidApiVenue } from 'core/data/inject-scripts/injectVenues';

import BaseService from './BaseService';
import CountryService from './CountryService';
import CityService from './CityService';

export interface IVenuesListParams {
  name?: string;
  countryId?: ResourceIdentifier;
  cityId?: ResourceIdentifier;
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
          ...CountryService.getIncludeRelations(),
        },
        {
          model: db.City,
          as: resources.CITY.ALIAS.SINGULAR,
          ...CityService.getIncludeRelations(),
        },
      ],
    };
  }

  /**
   * Get venues by provided filter data and pagination.
   */
  static async getAll(
    params: ServiceListParamsType<IVenuesListParams>
  ): ServiceListResultType<VenueViewModel> {
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

    // set alphabetical ordering
    if (!params.orderAttr) {
      params.orderAttr = 'name';
      params.order = OrderEnum.asc;
    }

    return this.findAndCountAll(db.Venue, query, params);
  }

  /**
   * Get venue by their ID.
   */
  static async getById(id: ResourceIdentifier): ServiceByIdResultType<VenueViewModel> {
    return this.findById(db.Venue, id);
  }

  /**
   * Inject data from Rapid API.
   */
  static async inject(countryName: string, countryId: ResourceIdentifier) {
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
        console.log(`>>> missing in DB[city]:`, {
          venue: item.name,
          city: item.city,
        });
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
    await db.Venue.bulkCreate(uniqueVenues, {
      ignoreDuplicates: true,
    });
  }
}

export default VenueService;
