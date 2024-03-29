import { GetFavoriteTeamsFilter, TeamViewModel } from '@ultras/core-api-sdk';

import {
  Filterable,
  FullFilterable,
  generateCRUD,
  IInitStoreParams,
} from './generateCRUD';
import { buildFavoriteTeamSDK } from './sdkBuilder/sdkBuilder';

type ParamType<TScheme> = IInitStoreParams<TeamViewModel, TScheme>;
type FilterType = Filterable<GetFavoriteTeamsFilter>;

type TCreateFavoriteTeam = {
  teamId: ResourceIdentifier;
};
type TDeleteFavoriteTeam = {
  favoriteTeamId?: ResourceIdentifier;
  teamId?: ResourceIdentifier;
};

const sdk = buildFavoriteTeamSDK();

const buildFavoriteTeamsStore = <TScheme>(params: Partial<ParamType<TScheme>> = {}) => {
  return generateCRUD<
    TeamViewModel,
    TeamViewModel,
    TCreateFavoriteTeam,
    null,
    TDeleteFavoriteTeam,
    FilterType,
    TScheme,
    'list' | 'add' | 'delete'
  >({
    keys: ['list', 'add', 'delete'],

    ...(params as ParamType<TScheme>),

    loadAll: (filter: FullFilterable<GetFavoriteTeamsFilter>) => {
      return sdk.getFavoriteTeams({
        ...filter,
      });
    },

    create: (data: TCreateFavoriteTeam) => {
      return sdk.add(data.teamId);
    },

    remove: (data: TDeleteFavoriteTeam) => {
      if (data.teamId) {
        return sdk.removeByTeamId(data.teamId);
      }

      if (data.favoriteTeamId) {
        return sdk.remove(data.favoriteTeamId);
      }
    },
  });
};

export default buildFavoriteTeamsStore;
