import {
  FavoriteTeamSDK,
  // ResourceIdentifier,
  GetFavoriteTeamsFilter,
  TeamViewModel,
} from '@ultras/core-api-sdk';

import {
  Filterable,
  FullFilterable,
  generateCRUD,
  InitStoreParamsInterface,
} from './generateCRUD';

type ParamType = InitStoreParamsInterface<TeamViewModel>;
type FilterType = Filterable<GetFavoriteTeamsFilter>;

type TCreateEvent = {
  teamId: ResourceIdentifier;
};
type TDeleteEvent = {
  favoriteTeamId?: ResourceIdentifier;
  teamId?: ResourceIdentifier;
};

const sdk = new FavoriteTeamSDK('dev');

const buildFavoriteTeamsStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<
    TeamViewModel,
    TeamViewModel,
    TCreateEvent,
    null,
    TDeleteEvent,
    FilterType,
    'list' | 'add' | 'delete'
  >({
    keys: ['list', 'add', 'delete'],

    ...(params as ParamType),

    loadAll: (filter: FullFilterable<GetFavoriteTeamsFilter>) => {
      return sdk.getFavoriteTeams({
        ...filter,
      });
    },

    create: (data: TCreateEvent) => {
      return sdk.add(data.teamId);
    },

    remove: (data: TDeleteEvent) => {
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
