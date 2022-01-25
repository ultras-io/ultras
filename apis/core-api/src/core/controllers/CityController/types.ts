import {
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
  DbIdentifier,
} from 'types';
import { CityAttributes } from 'core/data/models/City';

interface CitiesFilterInterface {
  name?: string;
  countryId?: DbIdentifier;
}

export type CitiesListParams = ControllerListParamsType<CitiesFilterInterface>;
export type CitiesListResult = ControllerListResultType<CityAttributes>;
export type CityByIdResult = ControllerByIdResultType<CityAttributes>;
export type CitiesInjectDataResult = ControllerInjectionResultType;
