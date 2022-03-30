import { FavoriteTeamsViewModel, FavoriteTeamViewModel } from '@ultras/view-models';
import {
  ControllerByIdResultType,
  ControllerListParamsType,
  ControllerListResultType,
  ControllerResultType,
  DbIdentifier,
} from 'types';

export type FavoriteTeamListParamsType = ControllerListParamsType<{
  search?: string;
  userId: DbIdentifier;
}>;

export type FavoriteTeamListResultType = ControllerListResultType<FavoriteTeamViewModel>;

export type FavoriteTeamByIdResult = ControllerByIdResultType<FavoriteTeamViewModel>;

export type AddFavoriteTeamBulkParamsType = {
  userId: DbIdentifier;
  teamId: DbIdentifier | Array<DbIdentifier>;
};

export type AddFavoriteTeamBulkResultType = ControllerResultType<
  FavoriteTeamsViewModel | FavoriteTeamViewModel
>;

export type RemoveFavoriteTeamParamsType = {
  userId: DbIdentifier;
  favoriteTeamId?: DbIdentifier;
  teamId?: DbIdentifier;
};
