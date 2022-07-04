import {
  MatchViewModel,
  MatchSDK,
  ResourceIdentifier,
  GetMatchesFilter,
} from '@ultras/core-api-sdk';

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
  return generateCRUD<MatchViewModel, null, null, FilterType, 'list' | 'single'>({
    keys: ['list', 'single'],
    ...(params as ParamType),

    loadAll: (filter: FullFilterable<GetMatchesFilter>) => {
      return sdk.getMatches({
        ...filter,
      });
    },

    loadSingle: (id: ResourceIdentifier) => {
      return sdk.getMatch(id);
    },
  });
};

export default buildMatchesStore;
