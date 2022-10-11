import type { UserViewModel } from '@ultras/view-models';
import type { ControllerListParamsType, ControllerListResultType } from 'types';

export interface ILikesFilter {
  eventId: ResourceIdentifier;
}

export interface ILikeUnlikeParams {
  userId: ResourceIdentifier;
  eventId: ResourceIdentifier;
}

export type LikesListParams = ControllerListParamsType<ILikesFilter>;
export type LikeListResult = ControllerListResultType<UserViewModel>;
