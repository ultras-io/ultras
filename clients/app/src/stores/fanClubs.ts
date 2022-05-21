import {
  FanClubViewModel,
  FanClubSDK,
  DbIdentifier,
  GetFanClubsFilter,
} from '@ultras/core-api-sdk';

import {
  Filterable,
  FullFilterable,
  generateCRUD,
  InitStoreParamsInterface,
} from './generateCRUD';

type ParamType = InitStoreParamsInterface<FanClubViewModel>;
type FilterType = Filterable<GetFanClubsFilter>;

const sdk = new FanClubSDK('dev');

const buildFanClubsStore = (params: Partial<ParamType> = {}) => {
  // return generateCRUD<FanClubViewModel, FilterType, 'list' | 'single' | 'add'>({
  return generateCRUD<FanClubViewModel, FilterType, 'list' | 'single'>({
    // keys: ['list', 'single', 'add'],
    keys: ['list', 'single'],
    ...(params as ParamType),

    loadAll: (filter: FullFilterable<GetFanClubsFilter>) => {
      return sdk.getFanClubs({
        ...filter,
      });
    },

    loadSingle: (id: DbIdentifier) => {
      return sdk.getFanClub(id);
    },

    // create: (data: Partial<FanClubViewModel>) => {
    //   return sdk.create(data);
    // },
  });
};

export default buildFanClubsStore;
