import { LeagueViewModel, LeaguesViewModel } from '@ultras/view-models';
import {
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
  DbIdentifier,
} from 'types';

interface LeaguesFilterInterface {
  name?: string;
  countryId?: DbIdentifier;
}

export type LeaguesListParams = ControllerListParamsType<LeaguesFilterInterface>;
export type LeaguesListResult = ControllerListResultType<LeaguesViewModel>;
export type LeagueByIdResult = ControllerByIdResultType<LeagueViewModel>;
export type LeaguesInjectDataResult = ControllerInjectionResultType;
