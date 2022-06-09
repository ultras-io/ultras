import { MultiResourceIdentifier } from '../types';

export type GetMatchesFilter = {
  date?: string;
  dateFrom?: string;
  dateTo?: string;
  teamId?: MultiResourceIdentifier;
  leagueId?: MultiResourceIdentifier;
};
