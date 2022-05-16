import { FavoriteTeamsViewModel, FavoriteTeamViewModel } from '@ultras/view-models';
import {
  ControllerByIdResultType,
  ControllerListParamsType,
  ControllerListResultType,
  ControllerResultType,
  ResourceIdentifier,
} from 'types';

export type FavoriteTeamListParamsType = ControllerListParamsType<{
  search?: string;
  userId: ResourceIdentifier;
}>;

export type FavoriteTeamListResultType = ControllerListResultType<FavoriteTeamViewModel>;

export type FavoriteTeamByIdResult = ControllerByIdResultType<FavoriteTeamViewModel>;

export type AddFavoriteTeamBulkParamsType = {
  userId: ResourceIdentifier;
  teamId: ResourceIdentifier | Array<ResourceIdentifier>;
};

export type AddFavoriteTeamBulkResultType = ControllerResultType<
  FavoriteTeamsViewModel | FavoriteTeamViewModel
>;

export type RemoveFavoriteTeamParamsType = {
  userId: ResourceIdentifier;
  favoriteTeamId?: ResourceIdentifier;
  teamId?: ResourceIdentifier;
};
