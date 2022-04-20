import { TeamsViewModel, TeamViewModel } from '@ultras/view-models';
import { TeamTypesEnum } from '@ultras/utils';
import { ApiResponseBodyType, DbIdentifier, ListResponseMetaType } from '../types';

export type GetTeamsFilter = {
  name?: string;
  countryId?: DbIdentifier;
  cityId?: DbIdentifier;
  type?: TeamTypesEnum;
};

export type GetTeamsResponse = ApiResponseBodyType<TeamsViewModel, ListResponseMetaType>;
export type GetTeamResponse = ApiResponseBodyType<TeamViewModel>;
