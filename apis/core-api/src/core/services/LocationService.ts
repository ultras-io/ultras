import { Transaction } from 'sequelize';
import { LocationViewModel } from '@ultras/view-models';
import { ServiceResultType } from 'types';

import db from 'core/data/models';
import { LocationCreationAttributes } from 'core/data/models/Location';

import BaseService from './BaseService';

export interface LocationListParamsInterface {
  search?: string;
}

export interface CreateParamsInterface {
  name: string;
  lat?: Nullable<number>;
  lng?: Nullable<number>;
}

export interface SearchParamsInterface {
  name?: Nullable<string>;
  lat?: Nullable<number>;
  lng?: Nullable<number>;
}

class LocationService extends BaseService {
  /**
   * Create location instance.
   */
  static async create(
    { name, lat, lng }: CreateParamsInterface,
    transaction?: Transaction
  ): ServiceResultType<LocationViewModel> {
    const locationData: LocationCreationAttributes = {
      name,
      lat,
      lng,
    };

    const location = await db.Location.create(locationData, { transaction });

    return location;
  }

  /**
   * Search location.
   */
  static async get({ name, lat, lng }: SearchParamsInterface) {
    const filterParams: any = {};

    if (name) {
      filterParams.name = {
        [db.Sequelize.Op.eq]: name,
      };
    }

    if (lat && lng) {
      filterParams.lat = {
        [db.Sequelize.Op.eq]: lat,
      };
      filterParams.lng = {
        [db.Sequelize.Op.eq]: lng,
      };
    }

    const location = await db.Location.findOne({
      where: filterParams,
    });

    return location;
  }

  /**
   * Create or get location instance.
   */
  static async createOrGet(
    { name, lat, lng }: CreateParamsInterface,
    transaction?: Transaction
  ) {
    if (!name && (!lat || !lng)) {
      return null;
    }

    const location = await this.get({
      name,
      lat,
      lng,
    });

    if (location) {
      return location;
    }

    return this.create(
      {
        name,
        lat,
        lng,
      },
      transaction
    );
  }
}

export default LocationService;
