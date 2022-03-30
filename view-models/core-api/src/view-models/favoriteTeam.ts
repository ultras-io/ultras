import { TeamViewModel } from './team';
import { UserViewModel } from './user';

export type FavoriteTeamViewModel = ViewModel<{
  team: TeamViewModel;
  user: UserViewModel;
}>;

export type FavoriteTeamsViewModel = Array<FavoriteTeamViewModel>;
