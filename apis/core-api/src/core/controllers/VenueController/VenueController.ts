import db from 'core/data/models';
import { VenueCreationAttributes } from 'core/data/models/Venue';
import { SomethingWentWrong } from 'modules/exceptions';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import injectVenues, { RapidApiVenue } from 'core/data/inject-scripts/injectVenues';

enum Order {
  asc = 'asc',
  desc = 'desc',
}

import {
  GetAllVenuesActionParams,
  GetAllVenuesActionResult,
  InjectVenuesDataResult,
  GetVenueByIdResult,
} from './types';

class VenueController {
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'id',
    order = Order.asc,
    name,
    countryId,
    cityId,
  }: GetAllVenuesActionParams): Promise<GetAllVenuesActionResult> {
    let nameQuery = null;
    let countryIdQuery: any = null;
    let cityIdQuery: any = null;
    let query = null;

    if (name) {
      nameQuery = {
        name: {
          [db.Sequelize.Op.iLike]: `%${name}%`,
        },
      };
    }
    if (countryId) {
      countryIdQuery = {
        countryId,
      };
    }
    if (cityId) {
      cityIdQuery = {
        cityId: cityId,
      };
    }

    if (nameQuery && (countryIdQuery || cityIdQuery)) {
      query = {
        [db.Sequelize.Op.and]: [nameQuery],
      };

      if (countryIdQuery) {
        query[db.Sequelize.Op.and].push(countryIdQuery);
      }
      if (cityIdQuery) {
        query[db.Sequelize.Op.and].push(cityIdQuery);
      }
    } else if (countryIdQuery && cityIdQuery) {
      query = {
        [db.Sequelize.Op.and]: [countryIdQuery, cityIdQuery],
      };
    } else {
      if (countryIdQuery) {
        query = countryIdQuery;
      } else if (cityIdQuery) {
        query = cityIdQuery;
      } else {
        query = nameQuery;
      }
    }

    const { rows, count } = await db.Venue.findAndCountAll({
      limit,
      offset,
      where: query,
      order: [[orderAttr, order]],
    });

    return {
      data: rows,
      count,
      limit,
      offset,
    };
  }

  static async getById(id: number): Promise<GetVenueByIdResult> {
    const Venue = await db.Venue.findByPk(id);

    return {
      data: Venue,
    };
  }

  /**
   * used to development purposes
   */
  static async inject(): Promise<InjectVenuesDataResult> {
    // inject here
    try {
      const excludedCountryCodes = ['AW', 'XK', 'PS', 'GP', 'GI', 'FO', 'CW', 'BM'];
      const excludedCountriesQuery = excludedCountryCodes.map(country => ({
        code: { [db.Sequelize.Op.ne]: country },
      }));

      const countries = await db.Country.findAll({
        where: {
          [db.Sequelize.Op.and]: [
            {
              name: { [db.Sequelize.Op.ne]: 'World' },
            },
            ...excludedCountriesQuery,
          ],
        },
        attributes: ['name', 'id'],
        order: [['name', Order.asc]],
      });

      for (const country of countries) {
        const {
          body: { response },
        } = await injectVenues(country.getDataValue('name'));

        if (response.length === 0) {
          continue;
        }

        const records: VenueCreationAttributes[] = [];
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
            countryId: country.getDataValue('id'),
            imageUri: item.image,
            dataRapidId: item.id,
          });
        }

        await db.Venue.bulkCreate(records);
      }

      return { data: { success: true } };
    } catch (e: any) {
      throw new SomethingWentWrong({
        message: "Api throws error or couldn't insert",
        originalMessage: e?.message,
      });
    }
  }
}

export default VenueController;
