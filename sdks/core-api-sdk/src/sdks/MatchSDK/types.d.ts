import { DbIdentifier } from '../types';

export type GetMatchesFilter = {
  date?: string;
  dateFrom?: string;
  dateTo?: string;
  teamId?: DbIdentifier;
  leagueId?: DbIdentifier;
};
