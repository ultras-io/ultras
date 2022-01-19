import NetworkService from '@ultras/services/NetworkService';

const options = {
  url: process.env.RAPIDAPI_FOOTBALL_API_BASEURL || '',
  headers: {
    'x-rapidapi-host': process.env.RAPIDAPI_FOOTBALL_API_HEADER_HOST,
    'x-rapidapi-key': process.env.RAPIDAPI_FOOTBALL_API_HEADER_KEY,
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

  return network.makeAPIGetRequest('venues', {
    headers: options.headers,
    query_params: {
      country: countryName,
    },
  });
};

export default getVenuesByCountryName;
