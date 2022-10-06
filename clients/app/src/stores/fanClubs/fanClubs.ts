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
} from '../generateCRUD';

import { DataTypeInterface, scheme } from './scheme';

type ParamType<TScheme> = InitStoreParamsInterface<FanClubViewModel, TScheme>;
type FilterType = Filterable<GetFanClubsFilter>;

type TDeleteEvent = {
  eventId: ResourceIdentifier;
};

const sdk = new FanClubSDK('dev');

const buildFanClubsStore = <TScheme = DataTypeInterface>(
  params: Partial<ParamType<TScheme>> = {}
) => {
  // return generateCRUD<FanClubViewModel, FilterType, 'list' | 'single' | 'add'>({
  return generateCRUD<
    FanClubViewModel,
    FanClubViewModel,
    FanClubViewModel,
    FanClubViewModel,
    TDeleteEvent,
    FilterType,
    TScheme,
    'list' | 'single' | 'add'
  >({
    keys: ['list', 'single', 'add'],
    ...(params as ParamType<TScheme>),
    scheme,

    loadAll: (filter: FullFilterable<GetFanClubsFilter>) => {
      return sdk.getFanClubs({
        ...filter,
      });
    },

    loadSingle: (id: ResourceIdentifier) => {
      return sdk.getFanClub(id);
    },

    create: (data: Partial<FanClubViewModel>) => {
      return sdk.create(data);
    },
  });
};

export default buildFanClubsStore;
