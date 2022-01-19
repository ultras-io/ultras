import NetworkService from '@ultras/services/NetworkService';
import { MatchStatusesEnum } from '@ultras/utils';

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

export type RapidStatusType =
  | 'TBD' // Time To Be Defined
  | 'NS' // Not Started
  | '1H' // First Half, Kick Off
  | 'HT' // Halftime
  | '2H' // Second Half, 2nd Half Started
  | 'ET' // Extra Time
  | 'P' // Penalty In Progress
  | 'FT' // Match Finished
  | 'AET' // Match Finished After Extra Time
  | 'PEN' // Match Finished After Penalty
  | 'BT' // Break Time (in Extra Time)
  | 'SUSP' // Match Suspended
  | 'INT' // Match Interrupted
  | 'PST' // Match Postponed
  | 'CANC' // Match Cancelled
  | 'ABD' // Match Abandoned
  | 'AWD' // Technical Loss
  | 'WO' // WalkOver
  | 'LIVE'; // In Progress

export const statusAdapter: Record<RapidStatusType, MatchStatusesEnum> = {
  TBD: MatchStatusesEnum.preMatch,
  NS: MatchStatusesEnum.preMatch,
  '1H': MatchStatusesEnum.live, // TODO: need to discuss.
  HT: MatchStatusesEnum.halfTime,
  '2H': MatchStatusesEnum.live, // TODO: need to discuss.
  ET: MatchStatusesEnum.extraTime,
  P: MatchStatusesEnum.penalties,
  FT: MatchStatusesEnum.finished,
  AET: MatchStatusesEnum.finished,
  PEN: MatchStatusesEnum.finished,
  BT: MatchStatusesEnum.halfTime,
  SUSP: MatchStatusesEnum.canceled, // TODO: need to discuss.
  INT: MatchStatusesEnum.canceled, // TODO: need to discuss.
  PST: MatchStatusesEnum.postponed,
  CANC: MatchStatusesEnum.canceled,
  ABD: MatchStatusesEnum.canceled, // TODO: need to discuss.
  AWD: MatchStatusesEnum.canceled, // TODO: need to discuss.
  WO: MatchStatusesEnum.canceled, // TODO: need to discuss.
  LIVE: MatchStatusesEnum.live,
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
      short: RapidStatusType;
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
