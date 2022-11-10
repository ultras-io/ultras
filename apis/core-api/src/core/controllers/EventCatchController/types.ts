import type { UserViewModel } from '@ultras/view-models';
import type { ControllerListParamsType, ControllerListResultType } from 'types';

export interface ICatchFilter {
  eventId: ResourceIdentifier;
}

export interface ICatchNonCatchParams {
  userId: ResourceIdentifier;
  eventId: ResourceIdentifier;
}

export type CatchListParams = ControllerListParamsType<ICatchFilter>;
export type CatchListResult = ControllerListResultType<UserViewModel>;
