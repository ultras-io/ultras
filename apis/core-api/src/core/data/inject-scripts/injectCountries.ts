import { NetworkService } from '@ultras/services';

const options = {
  url: 'https://api-football-beta.p.rapidapi.com/countries',
  headers: {
    'x-rapidapi-host': 'api-football-beta.p.rapidapi.com',
    'x-rapidapi-key': '43a63e0425mshfae301cb794607bp1defa2jsn766f0985d22a',
  },
};
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
