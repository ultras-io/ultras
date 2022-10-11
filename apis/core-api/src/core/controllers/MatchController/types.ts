import { MatchViewModel, MatchesViewModel } from '@ultras/view-models';
import {
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
  ResourceIdentifier,
} from 'types';

interface IMatchesFilter {
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  leagueId?: ResourceIdentifier;
  venueId?: ResourceIdentifier;
  teamId?: ResourceIdentifier;
  teamHomeId?: ResourceIdentifier;
  teamAwayId?: ResourceIdentifier;
}

export type MatchesListParams = ControllerListParamsType<IMatchesFilter>;
export type MatchesListResult = ControllerListResultType<MatchesViewModel>;
export type MatchByIdResult = ControllerByIdResultType<MatchViewModel>;
export type MatchesInjectDataResult = ControllerInjectionResultType;
