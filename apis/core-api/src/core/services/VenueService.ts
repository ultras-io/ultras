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

import BaseService, { RelationGroupType } from './BaseService';
import CountryService from './CountryService';
import CityService from './CityService';

export interface IVenuesListParams {
  name?: string;
  countryId?: ResourceIdentifier;
  cityId?: ResourceIdentifier;
}

export const defaultRelations: RelationGroupType = ['city', 'country'];

class VenueService extends BaseService {
  protected static includeRelations(relations: RelationGroupType = defaultRelations) {
    relations = relations || defaultRelations;
    const includeRelations = [];

    if (this.isRelationIncluded(relations, 'city')) {
      const relationsHierarchy = this.getRelationsHierarchy(relations || [], {
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

    return {
      include: includeRelations,
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
