import db from 'core/data/models';
import { OrderEnum } from '@ultras/utils';

import { VenueCreationAttributes } from 'core/data/models/Venue';
import { SomethingWentWrong } from 'modules/exceptions';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import injectVenues, { RapidApiVenue } from 'core/data/inject-scripts/injectVenues';
import resources from 'core/data/lcp';

import {
  GetAllVenuesActionParams,
  GetAllVenuesActionResult,
  InjectVenuesDataResult,
  GetVenueByIdResult,
} from './types';

class VenueController {
  private static includeRelations = {
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

  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'id',
    order = OrderEnum.asc,
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
      ...this.includeRelations,
    });

    return {
      data: rows,
      count,
      limit,
      offset,
    };
  }

  static async getById(id: number): Promise<GetVenueByIdResult> {
    const venue = await db.Venue.findByPk(id, {
      ...this.includeRelations,
    });

    return {
      data: venue,
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
        order: [['name', OrderEnum.asc]],
      });

      const records: VenueCreationAttributes[] = [];
      for (const country of countries) {
        const {
          body: { response },
        } = await injectVenues(country.getDataValue('name'));

        if (response.length === 0) {
          continue;
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
            countryId: country.getDataValue('id'),
            imageUri: item.image,
            dataRapidId: item.id,
          });
        }
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
