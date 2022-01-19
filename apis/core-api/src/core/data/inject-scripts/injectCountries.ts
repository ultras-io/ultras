import NetworkService from '@ultras/services/NetworkService';

const options = {
  url: process.env.RAPIDAPI_FOOTBALL_API_BASEURL || '',
  headers: {
    'x-rapidapi-host': process.env.RAPIDAPI_FOOTBALL_API_HEADER_HOST,
    'x-rapidapi-key': process.env.RAPIDAPI_FOOTBALL_API_HEADER_KEY,
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
