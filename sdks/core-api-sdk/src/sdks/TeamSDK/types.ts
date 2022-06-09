import { TeamsViewModel, TeamViewModel } from '@ultras/view-models';
import { TeamTypesEnum } from '@ultras/utils';
import {
  ApiResponseBodyType,
  MultiResourceIdentifier,
  ListResponseMetaType,
} from '../types';

export type GetTeamsFilter = {
  name?: string;
  countryId?: MultiResourceIdentifier;
  cityId?: MultiResourceIdentifier;
  type?: TeamTypesEnum;
};

export type GetTeamsResponse = ApiResponseBodyType<TeamsViewModel, ListResponseMetaType>;
export type GetTeamResponse = ApiResponseBodyType<TeamViewModel>;
