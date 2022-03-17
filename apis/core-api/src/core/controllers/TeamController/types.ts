import { TeamViewModel, TeamsViewModel } from '@ultras/view-models';
import {
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
  DbIdentifier,
} from 'types';

interface TeamsFilterInterface {
  name?: string;
  countryId?: DbIdentifier;
  cityId?: DbIdentifier;
  venueId?: DbIdentifier;
}

export type TeamsListParams = ControllerListParamsType<TeamsFilterInterface>;
export type TeamsListResult = ControllerListResultType<TeamsViewModel>;
export type TeamByIdResult = ControllerByIdResultType<TeamViewModel>;
export type TeamsInjectDataResult = ControllerInjectionResultType;
