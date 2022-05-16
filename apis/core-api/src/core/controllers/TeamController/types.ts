import { TeamTypesEnum } from '@ultras/utils';
import { TeamViewModel, TeamsViewModel } from '@ultras/view-models';
import {
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
  ResourceIdentifier,
} from 'types';

interface TeamsFilterInterface {
  name?: string;
  countryId?: ResourceIdentifier;
  cityId?: ResourceIdentifier;
  venueId?: ResourceIdentifier;
  type?: TeamTypesEnum;
}

export type TeamsListParams = ControllerListParamsType<TeamsFilterInterface>;
export type TeamsListResult = ControllerListResultType<TeamsViewModel>;
export type TeamByIdResult = ControllerByIdResultType<TeamViewModel>;
export type TeamsInjectDataResult = ControllerInjectionResultType;
