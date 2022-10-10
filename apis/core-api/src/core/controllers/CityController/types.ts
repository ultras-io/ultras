import { CityViewModel, CitiesViewModel } from '@ultras/view-models';
import {
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
  ResourceIdentifier,
} from 'types';

interface ICitiesFilter {
  name?: string;
  countryId?: ResourceIdentifier;
}

export type CitiesListParams = ControllerListParamsType<ICitiesFilter>;
export type CitiesListResult = ControllerListResultType<CitiesViewModel>;
export type CityByIdResult = ControllerByIdResultType<CityViewModel>;
export type CitiesInjectDataResult = ControllerInjectionResultType;
