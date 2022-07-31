import type { MatchesViewModel, MatchViewModel } from '@ultras/view-models';
import type {
  ApiResponseBodyType,
  ListResponseMetaType,
  MultiResourceIdentifier,
} from '../types';

export type GetMatchesFilter = {
  date?: string;
  dateFrom?: string;
  dateTo?: string;
  teamId?: MultiResourceIdentifier;
  leagueId?: MultiResourceIdentifier;
};

export type GetMatchesResponse = ApiResponseBodyType<
  MatchesViewModel,
  ListResponseMetaType
>;
export type GetMatchResponse = ApiResponseBodyType<MatchViewModel>;
