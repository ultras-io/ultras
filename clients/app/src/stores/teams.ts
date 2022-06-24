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

type ParamType = InitStoreParamsInterface<TeamViewModel>;
type FilterType = Filterable<GetTeamsFilter>;

const sdk = new TeamSDK('dev');

const buildTeamsStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<TeamViewModel, FilterType, 'list' | 'single'>({
    keys: ['list', 'single'],
    ...(params as ParamType),

    loadAll: (filter: FullFilterable<GetTeamsFilter>) => {
      return sdk.getTeams({
        ...filter,
      });
    },

    loadSingle: (id: ResourceIdentifier) => {
      return sdk.getTeam(id);
    },
  });
};

export default buildTeamsStore;
