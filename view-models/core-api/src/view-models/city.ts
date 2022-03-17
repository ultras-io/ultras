import { CountryViewModel } from './country';

export type CityViewModel = ViewModel<{
  name: string;
  country: CountryViewModel;
}>;

export type CitiesViewModel = Array<CityViewModel>;
