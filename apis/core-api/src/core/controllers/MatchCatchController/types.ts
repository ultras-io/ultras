import type { UserViewModel } from '@ultras/view-models';
import type { ControllerListParamsType, ControllerListResultType } from 'types';

export interface ICatchFilter {
  matchId: ResourceIdentifier;
}

export interface ICatchUncatchParams {
  userId: ResourceIdentifier;
  matchId: ResourceIdentifier;
}

export type CatchListParams = ControllerListParamsType<ICatchFilter>;
export type CatchListResult = ControllerListResultType<UserViewModel>;
