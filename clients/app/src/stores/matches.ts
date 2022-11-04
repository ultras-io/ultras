import { MatchViewModel, GetMatchesFilter } from '@ultras/core-api-sdk';
import {
  Filterable,
  FullFilterable,
  generateCRUD,
  IInitStoreParams,
} from './generateCRUD';
import { buildMatchSDK } from './sdkBuilder/sdkBuilder';

type ParamType<TScheme> = IInitStoreParams<MatchViewModel, TScheme>;
type FilterType = Filterable<GetMatchesFilter>;

const sdk = buildMatchSDK();

const buildMatchesStore = <TScheme>(params: Partial<ParamType<TScheme>> = {}) => {
  return generateCRUD<
    MatchViewModel,
    MatchViewModel,
    null,
    null,
    ResourceIdentifier,
    FilterType,
    TScheme,
    'list' | 'single'
  >({
    keys: ['list', 'single'],
    ...(params as ParamType<TScheme>),

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
