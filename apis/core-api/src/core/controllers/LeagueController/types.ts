import {
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
  DbIdentifier,
} from 'types';
import { LeagueAttributes } from 'core/data/models/League';

interface LeaguesFilterInterface {
  name?: string;
  countryId?: DbIdentifier;
}

export type LeaguesListParams = ControllerListParamsType<LeaguesFilterInterface>;
export type LeaguesListResult = ControllerListResultType<LeagueAttributes>;
export type LeagueByIdResult = ControllerByIdResultType<LeagueAttributes>;
export type LeaguesInjectDataResult = ControllerInjectionResultType;
