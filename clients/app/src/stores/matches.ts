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

// type OmittedFilterType = Omit<GetMatchesFilter>;

type ParamType = InitStoreParamsInterface<MatchViewModel>;
type FilterType = Filterable<GetMatchesFilter>;

const sdk = new MatchSDK('dev');

const buildMatchesStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<MatchViewModel, FilterType, 'list' | 'single'>({
    keys: ['list', 'single'],
    ...(params as ParamType),

    loadAll: (filter: FullFilterable<GetMatchesFilter>) => {
      return sdk.getMatches({
        orderAttr: 'dateTime',
        order: OrderEnum.desc,
        ...filter,
      });
    },

    loadSingle: (id: ResourceIdentifier) => {
      return sdk.getMatch(id);
    },
  });
};

export default buildMatchesStore;
