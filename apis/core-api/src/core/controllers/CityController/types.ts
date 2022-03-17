import { CityViewModel, CitiesViewModel } from '@ultras/view-models';
import {
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
  DbIdentifier,
} from 'types';

interface CitiesFilterInterface {
  name?: string;
  countryId?: DbIdentifier;
}

export type CitiesListParams = ControllerListParamsType<CitiesFilterInterface>;
export type CitiesListResult = ControllerListResultType<CitiesViewModel>;
export type CityByIdResult = ControllerByIdResultType<CityViewModel>;
export type CitiesInjectDataResult = ControllerInjectionResultType;
