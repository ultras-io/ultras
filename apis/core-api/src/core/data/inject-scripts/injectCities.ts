import { NetworkService } from '@ultras/services';
import { CityCreationAttributes } from 'core/data/models/City';

const options = {
  url: process.env.RAPID_GEO_API_URL || '',
  headers: {
    'x-rapidapi-host': process.env.X_RAPID_API_GEO_HOST,
    'x-rapidapi-key': process.env.X_RAPID_API_GEO_KEY,
  },
};

export type RapidApiCity = {
  id: number;
  name: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  population: number;
};

/**
 * Trying to get the first 20 cities, by population
 * @param countryCode
 * @param countryId
 */
const getCountryCities = async (
  countryCode: string,
  countryId: number
): Promise<CityCreationAttributes[]> => {
  const network = new NetworkService(options.url);

  const cities: CityCreationAttributes[] = [];

  const {
    body: { data },
  } = await network.makeAPIGetRequest('cities', {
    headers: options.headers,
    query_params: {
      countryIds: countryCode,
      sort: '-population',
      limit: 20,
      offset: 0,
    },
  });
  data.forEach((item: RapidApiCity) => {
    cities.push({
      name: item.name,
      dataRapidId: item.id,
      countryId,
    });
  });

  return cities;
};

export default getCountryCities;
