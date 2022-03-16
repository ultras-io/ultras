import { CountriesViewModel, CountryViewModel } from '@ultras/view-models';
import {
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
} from 'types';

interface CountriesFilterInterface {
  name?: string;
  code?: string;
}

export type CountriesListParams = ControllerListParamsType<CountriesFilterInterface>;
export type CountriesListResult = ControllerListResultType<CountriesViewModel>;
export type CountryByIdResult = ControllerByIdResultType<CountryViewModel>;
export type CountriesInjectDataResult = ControllerInjectionResultType;
