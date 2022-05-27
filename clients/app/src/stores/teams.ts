import {
  TeamViewModel,
  TeamSDK,
  ResourceIdentifier,
  GetTeamsFilter,
} from '@ultras/core-api-sdk';
import {
  Filterable,
  FullFilterable,
  generateCRUD,
  InitStoreParamsInterface,
} from './generateCRUD';
import { OrderEnum } from '@ultras/utils';

type ParamType = InitStoreParamsInterface<TeamViewModel>;
type FilterType = Filterable<GetTeamsFilter>;

const sdk = new TeamSDK('dev');

const buildTeamsStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<TeamViewModel, FilterType, 'list' | 'single'>({
    keys: ['list', 'single'],
    ...(params as ParamType),

    loadAll: (filter: FullFilterable<FilterType>) => {
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

export default buildTeamsStore;
