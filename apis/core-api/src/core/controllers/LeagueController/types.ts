import {
  ControllerActionOperatedResult,
  ControllerListActionResult,
  ListRequestParams,
} from 'types';
import { LeagueAttributes } from 'core/data/models/League';

export interface GetAllLeaguesActionParams extends ListRequestParams {
  name?: string;
  countryId?: number;
}

export type GetAllLeaguesActionResult = ControllerListActionResult<LeagueAttributes>;

export type InjectLeaguesDataResult = ControllerActionOperatedResult<{
  success: boolean;
}>;

export type GetLeagueByIdResult = ControllerActionOperatedResult<LeagueAttributes>;
