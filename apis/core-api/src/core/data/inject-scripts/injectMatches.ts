import NetworkService from '@ultras/services/NetworkService';
import { MatchStatusRapidType } from '@ultras/utils';

const options = {
  url: process.env.RAPIDAPI_FOOTBALL_API_BASEURL || '',
  headers: {
    'x-rapidapi-host': process.env.RAPIDAPI_FOOTBALL_API_HEADER_HOST,
    'x-rapidapi-key': process.env.RAPIDAPI_FOOTBALL_API_HEADER_KEY,
  },
};

type HomeOrAway<T> = {
  home: T;
  away: T;
};

type RapidTeamType = {
  id: number;
  name: string;
  logo: string;
  winner: null;
};

export type RapidApiMatch = {
  fixture: {
    id: number;
    referee: string | null;
    timezone: string;
    date: string;
    timestamp: number;
    periods: {
      first: number;
      second: number;
    };
    venue: {
      id: number;
      name: string;
      city: string;
    };
    status: {
      long: string;
      short: MatchStatusRapidType;
      elapsed: number;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    round: string;
  };
  teams: HomeOrAway<RapidTeamType>;
  goals: HomeOrAway<number | null>;
  score: {
    halftime: HomeOrAway<number | null>;
    fulltime: HomeOrAway<number | null>;
    extratime: HomeOrAway<number | null>;
    penalty: HomeOrAway<number | null>;
  };
};

const getMatchesByDate = (date: string) => {
  const network = new NetworkService(options.url);

  return network.makeAPIGetRequest('fixtures', {
    headers: options.headers,
    query_params: {
      date: date,
      timezone: 'Europe/London', // +00:00, same as UTC
    },
  });
};

export default getMatchesByDate;
