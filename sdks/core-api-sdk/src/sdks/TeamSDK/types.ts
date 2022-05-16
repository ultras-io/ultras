import { TeamsViewModel, TeamViewModel } from '@ultras/view-models';
import { TeamTypesEnum } from '@ultras/utils';
import { ApiResponseBodyType, ResourceIdentifier, ListResponseMetaType } from '../types';

export type GetTeamsFilter = {
  name?: string;
  countryId?: ResourceIdentifier;
  cityId?: ResourceIdentifier;
  type?: TeamTypesEnum;
};

export type GetTeamsResponse = ApiResponseBodyType<TeamsViewModel, ListResponseMetaType>;
export type GetTeamResponse = ApiResponseBodyType<TeamViewModel>;
