import type { LeaguesViewModel, LeagueViewModel } from '@ultras/view-models';
import type {
  ApiResponseBodyType,
  ListResponseMetaType,
  MultiResourceIdentifier,
} from '../types';

export type GetLeaguesFilter = {
  name?: string;
  countryId?: MultiResourceIdentifier;
};

export type GetLeaguesResponse = ApiResponseBodyType<
  LeaguesViewModel,
  ListResponseMetaType
>;
export type GetLeagueResponse = ApiResponseBodyType<LeagueViewModel>;
