import {
  FanClubViewModel,
  FanClubSDK,
  ResourceIdentifier,
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

type TDeleteEvent = {
  eventId: ResourceIdentifier;
};

const sdk = new FanClubSDK('dev');

const buildFanClubsStore = (params: Partial<ParamType> = {}) => {
  // return generateCRUD<FanClubViewModel, FilterType, 'list' | 'single' | 'add'>({
  return generateCRUD<
    FanClubViewModel,
    FanClubViewModel,
    FanClubViewModel,
    FanClubViewModel,
    TDeleteEvent,
    FilterType,
    'list' | 'single'
  >({
    // keys: ['list', 'single', 'add'],
    keys: ['list', 'single'],
    ...(params as ParamType),

    loadAll: (filter: FullFilterable<GetFanClubsFilter>) => {
      return sdk.getFanClubs({
        ...filter,
      });
    },

    loadSingle: (id: ResourceIdentifier) => {
      return sdk.getFanClub(id);
    },

    // create: (data: Partial<FanClubViewModel>) => {
    //   return sdk.create(data);
    // },
  });
};

export default buildFanClubsStore;
