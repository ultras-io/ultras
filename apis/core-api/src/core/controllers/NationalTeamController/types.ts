import { ControllerListActionResult, ListRequestParams } from 'types';
import { NationalTeamAttributes } from 'core/data/models/NationalTeam';

export interface GetAllNTeamsActionParams extends ListRequestParams {
  name?: string;
}

export type GetAllNTeamsActionResult =
  ControllerListActionResult<NationalTeamAttributes>;
