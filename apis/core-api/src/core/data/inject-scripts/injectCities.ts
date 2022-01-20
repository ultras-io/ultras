import NetworkService from '@ultras/services/NetworkService';
import { CityCreationAttributes } from 'core/data/models/City';

const options = {
  url: process.env.RAPIDAPI_GEODB_BASEURL || '',
  headers: {
    'x-rapidapi-host': process.env.RAPIDAPI_GEODB_HEADER_HOST,
    'x-rapidapi-key': process.env.RAPIDAPI_GEODB_HEADER_KEY,
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
const getCountryCities = async (countryCode: string) => {
  const network = new NetworkService(options.url);

  return network.makeAPIGetRequest('cities', {
    headers: options.headers,
    query_params: {
      countryIds: countryCode,
      sort: '-population',
      limit: 20,
      offset: 0,
    },
  });
};

export default getCountryCities;
