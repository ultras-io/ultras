import { FanClubPrivacyEnum } from '@ultras/utils';

import { CityViewModel } from './city';
import { CountryViewModel } from './country';
import { TeamViewModel } from './team';
import { UserViewModel } from './user';

export type FanClubViewModel = ViewModel<{
  isOfficial: false;
  name: string;
  description: string;
  avatar: string;
  coverPhoto: string;
  privacy: FanClubPrivacyEnum;
  city: CityViewModel;
  country: CountryViewModel;
  team: TeamViewModel;
  owner: UserViewModel;
}>;

export type FanClubsViewModel = Array<FanClubViewModel>;