import {
  FavoriteTeamsViewModel,
  FavoriteTeamViewModel,
  TeamsViewModel,
} from '@ultras/view-models';
import { ApiResponseBodyType, ListResponseMetaType } from '../types';

export type SingleCreateFavoriteTeamResult = ApiResponseBodyType<FavoriteTeamViewModel>;
export type BulkCreateFavoriteTeamResult = ApiResponseBodyType<FavoriteTeamsViewModel>;

export type GetFavoriteTeamsFilter = {
  search?: string;
};

export type GetFavoriteTeamsResult = ApiResponseBodyType<
  TeamsViewModel,
  ListResponseMetaType
>;

export type GetFavoriteTeamResult = ApiResponseBodyType<FavoriteTeamViewModel>;
