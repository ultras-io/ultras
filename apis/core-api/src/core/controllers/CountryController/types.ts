import {
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
} from 'types';
import { CountryAttributes } from 'core/data/models/Country';

interface CountriesFilterInterface {
  name?: string;
  code?: string;
}

export type CountriesListParams = ControllerListParamsType<CountriesFilterInterface>;
export type CountriesListResult = ControllerListResultType<CountryAttributes>;
export type CountryByIdResult = ControllerByIdResultType<CountryAttributes>;
export type CountriesInjectDataResult = ControllerInjectionResultType;
