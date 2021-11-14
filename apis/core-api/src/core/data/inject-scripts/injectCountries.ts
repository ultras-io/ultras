import { NetworkService } from '@ultras/services';

const options = {
  url: process.env.RAPID_FOOTBALL_API_URL || '',
  headers: {
    'x-rapidapi-host': process.env.X_RAPID_API_HOST,
    'x-rapidapi-key': process.env.X_RAPID_API_KEY,
  },
};
console.log(options);
const network = new NetworkService(options.url);

export type RapidApiCountry = {
  name: string;
  code: string;
  id: number;
  flag: string;
};

const getCountries = () => {
  return network.makeAPIGetRequest('country', {
    headers: options.headers,
  });
};

export default getCountries;
