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

type ParamType<TScheme> = InitStoreParamsInterface<FanClubViewModel, TScheme>;
type FilterType = Filterable<GetFanClubsFilter>;

type TDeleteEvent = {
  eventId: ResourceIdentifier;
};

const sdk = new FanClubSDK('dev');

const buildFanClubsStore = <TScheme>(params: Partial<ParamType<TScheme>> = {}) => {
  // return generateCRUD<FanClubViewModel, FilterType, 'list' | 'single' | 'add'>({
  return generateCRUD<
    FanClubViewModel,
    FanClubViewModel,
    FanClubViewModel,
    FanClubViewModel,
    TDeleteEvent,
    FilterType,
    TScheme,
    'list' | 'single'
  >({
    // keys: ['list', 'single', 'add'],
    keys: ['list', 'single'],
    ...(params as ParamType<TScheme>),

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
