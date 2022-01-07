import { NetworkService } from '@ultras/services';

const options = {
  url: process.env.RAPID_FOOTBALL_API_URL_VENUES || '',
  headers: {
    'x-rapidapi-host': process.env.X_RAPID_API_FOOTBALL_HOST,
    'x-rapidapi-key': process.env.X_RAPID_API_FOOTBALL_KEY,
  },
};

export type RapidApiVenue = {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  capacity: number;
  surface: string;
  image: string;
};

const getVenuesByCountryName = (countryName: string) => {
  const network = new NetworkService(options.url);

  return network.makeAPIGetRequest('', {
    headers: options.headers,
    query_params: {
      country: countryName,
    },
  });
};

export default getVenuesByCountryName;
