import { CityViewModel, CitiesViewModel } from '@ultras/view-models';
import {
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
  ResourceIdentifier,
} from 'types';

interface CitiesFilterInterface {
  name?: string;
  countryId?: ResourceIdentifier;
}

export type CitiesListParams = ControllerListParamsType<CitiesFilterInterface>;
export type CitiesListResult = ControllerListResultType<CitiesViewModel>;
export type CityByIdResult = ControllerByIdResultType<CityViewModel>;
export type CitiesInjectDataResult = ControllerInjectionResultType;
