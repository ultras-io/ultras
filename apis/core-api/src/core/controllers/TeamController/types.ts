import { ListRequestParams } from '@ultras/utils';
import { ControllerActionOperatedResult, ControllerListActionResult } from 'types';
import { TeamAttributes } from 'core/data/models/Team';

export interface GetAllTeamsActionParams extends ListRequestParams {
  name?: string;
  countryId?: number;
  cityId?: number;
}

export type GetAllTeamsActionResult = ControllerListActionResult<TeamAttributes>;

export type InjectTeamsDataResult = ControllerActionOperatedResult<{
  success: boolean;
}>;

export type GetTeamByIdResult = ControllerActionOperatedResult<TeamAttributes>;
