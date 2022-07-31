import type { CountriesViewModel, CountryViewModel } from '@ultras/view-models';
import type { ApiResponseBodyType, ListResponseMetaType } from '../types';

export type GetCountriesFilter = {
  name?: string;
  code?: string;
};

export type GetCountriesResponse = ApiResponseBodyType<
  CountriesViewModel,
  ListResponseMetaType
>;
export type GetCountryResponse = ApiResponseBodyType<CountryViewModel>;
