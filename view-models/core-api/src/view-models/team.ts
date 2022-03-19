import { TeamTypesEnum } from '@ultras/utils';

import { CityViewModel } from './city';
import { CountryViewModel } from './country';
import { VenueViewModel } from './venue';

export type TeamViewModel = ViewModel<{
  name: string;
  founded: number;
  logo: string;
  type: TeamTypesEnum;
  country: CountryViewModel;
  city: CityViewModel;
  venue: VenueViewModel;
}>;

export type TeamsViewModel = Array<TeamViewModel>;
