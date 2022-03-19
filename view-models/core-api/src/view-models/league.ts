import { CountryViewModel } from './country';

export type LeagueViewModel = ViewModel<{
  name: string;
  logo: string;
  country: CountryViewModel;
}>;

export type LeaguesViewModel = Array<LeagueViewModel>;
