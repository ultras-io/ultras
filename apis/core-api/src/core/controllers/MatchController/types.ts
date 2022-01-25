import {
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
  DbIdentifier,
} from 'types';
import { MatchAttributes } from 'core/data/models/Match';

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
export type MatchesListResult = ControllerListResultType<MatchAttributes>;
export type MatchByIdResult = ControllerByIdResultType<MatchAttributes>;
export type MatchesInjectDataResult = ControllerInjectionResultType;
