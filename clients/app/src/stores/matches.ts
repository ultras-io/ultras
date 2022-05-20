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

const buildFootballClubStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<MatchViewModel, FilterType, 'list' | 'single'>({
    keys: ['list', 'single'],
    ...(params as ParamType),

    loadAll: (filter: FullFilterable<GetMatchesFilter>) => {
      return sdk.getMatches({
        ...filter,
        // dateFrom: '2022-04-05',
        // dateTo: '2022-05-30',
        // leagueId: 254,
        // teamId: 2124,
        orderAttr: 'dateTime',
        order: OrderEnum.desc,
        // limit: 3,
      });
    },

    loadSingle: (id: ResourceIdentifier) => {
      return sdk.getMatch(id);
    },
  });
};

export default buildFootballClubStore;
