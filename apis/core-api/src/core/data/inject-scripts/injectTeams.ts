import { NetworkService } from '@ultras/services';

const options = {
  url: process.env.RAPID_FOOTBALL_API_URL || '',
  headers: {
    'x-rapidapi-host': process.env.X_RAPID_API_FOOTBALL_HOST,
    'x-rapidapi-key': process.env.X_RAPID_API_FOOTBALL_KEY,
  },
};

export type RapidApiTeam = {
  team: {
    id: number;
    name: string;
    country: string;
    founded: number;
    national: boolean;
    logo: string;
  };
  venue: {
    id: number;
    name: string;
    address: string;
    city: string;
    country: string;
    capacity: number;
    surface: string;
    image: string;
  };
};

const getTeamsByCountryName = (countryName: string) => {
  const network = new NetworkService(options.url);

  return network.makeAPIGetRequest('teams', {
    headers: options.headers,
    query_params: {
      country: countryName,
    },
  });
};

export default getTeamsByCountryName;
