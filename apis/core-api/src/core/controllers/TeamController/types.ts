import {
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
  DbIdentifier,
} from 'types';
import { TeamAttributes } from 'core/data/models/Team';

interface TeamsFilterInterface {
  name?: string;
  countryId?: DbIdentifier;
  cityId?: DbIdentifier;
  venueId?: DbIdentifier;
}

export type TeamsListParams = ControllerListParamsType<TeamsFilterInterface>;
export type TeamsListResult = ControllerListResultType<TeamAttributes>;
export type TeamByIdResult = ControllerByIdResultType<TeamAttributes>;
export type TeamsInjectDataResult = ControllerInjectionResultType;
