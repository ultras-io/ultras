import { CountriesViewModel, CountryViewModel } from '@ultras/view-models';
import {
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
} from 'types';

interface ICountriesFilter {
  name?: string;
  code?: string;
}

export type CountriesListParams = ControllerListParamsType<ICountriesFilter>;
export type CountriesListResult = ControllerListResultType<CountriesViewModel>;
export type CountryByIdResult = ControllerByIdResultType<CountryViewModel>;
export type CountriesInjectDataResult = ControllerInjectionResultType;
