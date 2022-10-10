import { LeagueViewModel, LeaguesViewModel } from '@ultras/view-models';
import {
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
  ResourceIdentifier,
} from 'types';

interface ILeaguesFilter {
  name?: string;
  countryId?: ResourceIdentifier;
}

export type LeaguesListParams = ControllerListParamsType<ILeaguesFilter>;
export type LeaguesListResult = ControllerListResultType<LeaguesViewModel>;
export type LeagueByIdResult = ControllerByIdResultType<LeagueViewModel>;
export type LeaguesInjectDataResult = ControllerInjectionResultType;
