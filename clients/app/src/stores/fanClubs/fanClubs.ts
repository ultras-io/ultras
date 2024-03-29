import {
  FanClubViewModel,
  GetFanClubsFilter,
  FanClubCreateType,
} from '@ultras/core-api-sdk';
import { buildFanClubSDK } from 'stores/sdkBuilder/sdkBuilder';

import {
  Filterable,
  FullFilterable,
  generateCRUD,
  IInitStoreParams,
} from '../generateCRUD';

import { IDataType, scheme } from './scheme';

type ParamType<TScheme> = IInitStoreParams<FanClubViewModel, TScheme>;
type FilterType = Filterable<GetFanClubsFilter>;

type TDeleteEvent = {
  eventId: ResourceIdentifier;
};

const sdk = buildFanClubSDK();

const buildFanClubsStore = <TScheme = IDataType>(
  params: Partial<ParamType<TScheme>> = {}
) => {
  // return generateCRUD<FanClubViewModel, FilterType, 'list' | 'single' | 'add'>({
  return generateCRUD<
    FanClubViewModel,
    FanClubViewModel,
    FanClubCreateType,
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
