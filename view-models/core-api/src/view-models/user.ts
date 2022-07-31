import type { FanClubsViewModel } from './fanClub';
import type { TeamsViewModel } from './team';

export type BaseUserViewModel = ViewModel<{
  phone: Nullable<string>;
  email: Nullable<string>;
  username: Nullable<string>;
  avatar: Nullable<string>;
  fullname: Nullable<string>;
}>;

export type UserViewModel = BaseUserViewModel & {
  fanClubs: FanClubsViewModel;
  teams: TeamsViewModel;
};

export type UsersViewModel = Array<BaseUserViewModel>;
