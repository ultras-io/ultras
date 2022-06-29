import {
  FavoriteTeamViewModel,
  FavoriteTeamSDK,
  // ResourceIdentifier,
  GetFavoriteTeamsFilter,
} from '@ultras/core-api-sdk';

import {
  Filterable,
  FullFilterable,
  generateCRUD,
  InitStoreParamsInterface,
} from './generateCRUD';

type ParamType = InitStoreParamsInterface<FavoriteTeamViewModel>;
type FilterType = Filterable<GetFavoriteTeamsFilter>;

const sdk = new FavoriteTeamSDK('dev');

const buildFavoriteTeamsStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<FavoriteTeamViewModel, FilterType, 'list'>({
    keys: ['list'],

    ...(params as ParamType),

    loadAll: (filter: FullFilterable<GetFavoriteTeamsFilter>) => {
      return sdk.getFavoriteTeams({
        ...filter,
      });
    },

    // create: (data: ResourceIdentifier) => {
    //   return sdk.add(data);
    // },
  });
};

export default buildFavoriteTeamsStore;
