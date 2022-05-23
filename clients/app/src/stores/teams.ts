import {
  TeamViewModel,
  TeamSDK,
  ResourceIdentifier,
  GetTeamsFilter,
} from '@ultras/core-api-sdk';
import { TeamTypesEnum } from '@ultras/utils';
import {
  Filterable,
  FullFilterable,
  generateCRUD,
  InitStoreParamsInterface,
} from './generateCRUD';
import { OrderEnum } from '@ultras/utils';

type OmittedFilterType = Omit<GetTeamsFilter, 'type'>;

type ImmutableFilter = {
  type: TeamTypesEnum;
};

type ParamType = InitStoreParamsInterface<TeamViewModel, ImmutableFilter>;
type FilterType = Filterable<OmittedFilterType>;

const sdk = new TeamSDK('dev');

const buildFootballClubStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<TeamViewModel, FilterType, 'list' | 'single', ImmutableFilter>({
    keys: ['list', 'single'],
    ...(params as ParamType),

    loadAll: (filter: FullFilterable<OmittedFilterType>) => {
      return sdk.getTeams({
        orderAttr: 'id',
        order: OrderEnum.asc,
        ...filter,
      });
    },

    loadSingle: (id: ResourceIdentifier) => {
      return sdk.getTeam(id);
    },
  });
};

export default buildFootballClubStore;
