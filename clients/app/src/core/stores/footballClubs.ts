import {
  TeamViewModel,
  TeamSDK,
  DbIdentifier,
  GetTeamsFilter,
} from '@ultras/core-api-sdk';
import { TeamTypesEnum } from '@ultras/utils';
import {
  Filterable,
  FullFilterable,
  generateCRUD,
  InitStoreParamsInterface,
} from './generateCRUD';

type OmittedFilterType = Omit<GetTeamsFilter, 'type'>;

type ParamType = InitStoreParamsInterface<TeamViewModel>;
type FilterType = Filterable<OmittedFilterType>;

const sdk = new TeamSDK('dev');

const buildFootballClubStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<TeamViewModel, FilterType, 'list' | 'single'>({
    keys: ['list', 'single'],
    ...(params as ParamType),

    loadAll: (filter: FullFilterable<OmittedFilterType>) => {
      return sdk.getTeams({
        ...filter,
        type: TeamTypesEnum.club,
      });
    },

    loadSingle: (id: DbIdentifier) => {
      return sdk.getTeam(id);
    },
  });
};

export default buildFootballClubStore;
