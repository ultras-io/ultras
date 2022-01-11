import { ListRequestParams } from '@ultras/utils';
import { ControllerActionOperatedResult, ControllerListActionResult } from 'types';
import { MatchAttributes } from 'core/data/models/Match';

export interface GetAllMatchesActionParams extends ListRequestParams {
  dateFrom?: string;
  dateTo?: string;
  teamId?: number;
  leagueId?: number;
}

export type GetAllMatchesActionResult = ControllerListActionResult<MatchAttributes>;

export type InjectMatchesDataResult = ControllerActionOperatedResult<{
  success: boolean;
}>;

export type GetMatchByIdResult = ControllerActionOperatedResult<MatchAttributes>;
