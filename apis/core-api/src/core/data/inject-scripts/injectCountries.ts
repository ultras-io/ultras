import { NetworkService } from '@ultras/services';

const options = {
  url: process.env.RAPID_FOOTBALL_API_URL || '',
  headers: {
    'x-rapidapi-host': process.env.X_RAPID_API_FOOTBALL_HOST,
    'x-rapidapi-key': process.env.X_RAPID_API_FOOTBALL_KEY,
  },
};

export type RapidApiCountry = {
  name: string;
  code: string;
  id: number;
  flag: string;
};

const getCountries = () => {
  const network = new NetworkService(options.url);

  return network.makeAPIGetRequest('countries', {
    headers: options.headers,
  });
};

export default getCountries;
