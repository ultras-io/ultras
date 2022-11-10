import type { UserViewModel } from '@ultras/view-models';
import type { ControllerListParamsType, ControllerListResultType } from 'types';

export interface ICatchFilter {
  roomId: ResourceIdentifier;
}

export interface ICatchNonCatchParams {
  userId: ResourceIdentifier;
  roomId: ResourceIdentifier;
}

export type CatchListParams = ControllerListParamsType<ICatchFilter>;
export type CatchListResult = ControllerListResultType<UserViewModel>;
