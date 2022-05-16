import { ResourceIdentifier } from '../types';

export type GetMatchesFilter = {
  date?: string;
  dateFrom?: string;
  dateTo?: string;
  teamId?: ResourceIdentifier;
  leagueId?: ResourceIdentifier;
};
