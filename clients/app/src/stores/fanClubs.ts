import { FanClubViewModel, FanClubSDK, GetFanClubsFilter } from '@ultras/core-api-sdk';
import {
  generateCRUD,
  Filterable,
  InitStoreParamsInterface,
  FullFilterable,
} from './generateCRUD';

type ParamType = InitStoreParamsInterface<FanClubViewModel>;
type FilterType = Filterable<GetFanClubsFilter>;

const sdk = new FanClubSDK('dev');

const buildFanClubStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<FanClubViewModel, FilterType, 'list' | 'single' | 'add'>({
    keys: ['list', 'single', 'add'],
    ...(params as ParamType),

    loadAll: (filter: FullFilterable<GetFanClubsFilter>) => {
      return sdk.getFanClubs(filter);
    },

    loadSingle: (id: ResourceIdentifier) => {
      return sdk.getFanClub(id);
    },

    create: (data: Partial<FanClubViewModel>) => {
      return sdk.create({});
    },
  });
};

export default buildFanClubStore;
