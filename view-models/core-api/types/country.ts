export type CountryViewModel = ViewModel<{
  name: string;
  code: string;
  flag: string;
  telPrefix: Nullable<string>;
}>;

export type CountriesViewModel = Array<CountryViewModel>;
