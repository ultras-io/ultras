import { CountriesViewModel, CountryViewModel } from '@ultras/view-models';
import { ApiResponseBodyType, ListResponseMetaType } from '../types';

export type GetCountriesFilter = {
  name?: string;
  code?: string;
};

export type GetCountriesResponse = ApiResponseBodyType<
  CountriesViewModel,
  ListResponseMetaType
>;
export type GetCountryResponse = ApiResponseBodyType<CountryViewModel>;
