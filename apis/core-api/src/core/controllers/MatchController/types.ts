import { MatchViewModel, MatchesViewModel } from '@ultras/view-models';
import {
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
  DbIdentifier,
} from 'types';

interface MatchesFilterInterface {
  dateFrom?: string;
  dateTo?: string;
  leagueId?: DbIdentifier;
  venueId?: DbIdentifier;
  teamId?: DbIdentifier;
  teamHomeId?: DbIdentifier;
  teamAwayId?: DbIdentifier;
}

export type MatchesListParams = ControllerListParamsType<MatchesFilterInterface>;
export type MatchesListResult = ControllerListResultType<MatchesViewModel>;
export type MatchByIdResult = ControllerByIdResultType<MatchViewModel>;
export type MatchesInjectDataResult = ControllerInjectionResultType;
