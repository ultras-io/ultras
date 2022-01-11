import { NetworkService } from '@ultras/services';

const options = {
  url: process.env.RAPID_FOOTBALL_API_URL || '',
  headers: {
    'x-rapidapi-host': process.env.X_RAPID_API_FOOTBALL_HOST,
    'x-rapidapi-key': process.env.X_RAPID_API_FOOTBALL_KEY,
  },
};

export type RapidApiLeagueSeason = {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: {
    standings: boolean;
    players: boolean;
    top_scorers: boolean;
    top_assists: boolean;
    top_cards: boolean;
    injuries: boolean;
    predictions: boolean;
    odds: boolean;
    fixtures: {
      events: boolean;
      lineups: boolean;
      statistics_fixtures: boolean;
      statistics_players: boolean;
    };
  };
};

export type RapidApiLeague = {
  league: {
    id: number;
    name: string;
    type: string;
    logo: string;
  };
  country: {
    name: string;
    code: string;
    flag: string;
  };
  seasons: Array<RapidApiLeagueSeason>;
};

const getLeaguesByCountryName = (countryName: string) => {
  const network = new NetworkService(options.url);

  return network.makeAPIGetRequest('leagues', {
    headers: options.headers,
    query_params: {
      country: countryName,
    },
  });
};

export default getLeaguesByCountryName;
