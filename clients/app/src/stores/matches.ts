import {
  MatchViewModel,
  MatchSDK,
  ResourceIdentifier,
  GetMatchesFilter,
} from '@ultras/core-api-sdk';
import { OrderEnum } from '@ultras/utils';

import {
  Filterable,
  FullFilterable,
  generateCRUD,
  InitStoreParamsInterface,
} from './generateCRUD';

type ParamType = InitStoreParamsInterface<MatchViewModel>;
type FilterType = Filterable<GetMatchesFilter>;

const sdk = new MatchSDK('dev');

const buildMatchesStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<MatchViewModel, FilterType, 'list' | 'single'>({
    keys: ['list', 'single'],
    ...(params as ParamType),

    loadAll: (filter: FullFilterable<GetMatchesFilter>) => {
      return sdk.getMatches({
        ...filter,
        orderAttr: 'dateTime',
        order: OrderEnum.desc,
        limit: 10,
        teamId: 2124,
      });
    },

    loadSingle: (id: ResourceIdentifier) => {
      return sdk.getMatch(id);
    },
  });
};

export default buildMatchesStore;
