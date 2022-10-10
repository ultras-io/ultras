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
  IInitStoreParams,
} from './generateCRUD';

type ParamType<TScheme> = IInitStoreParams<TeamViewModel, TScheme>;
type FilterType = Filterable<GetTeamsFilter>;

const sdk = new TeamSDK('dev');

const buildTeamsStore = <TScheme>(params: Partial<ParamType<TScheme>> = {}) => {
  return generateCRUD<
    TeamViewModel,
    TeamViewModel,
    TeamViewModel,
    TeamViewModel,
    ResourceIdentifier,
    FilterType,
    TScheme,
    'list' | 'single'
  >({
    keys: ['list', 'single'],
    ...(params as ParamType<TScheme>),

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
