import type { UserViewModel } from '@ultras/view-models';
import type { ControllerListParamsType, ControllerListResultType } from 'types';

export interface LikesFilterInterface {
  roomId: ResourceIdentifier;
}

export interface LikeUnlikeParamsInterface {
  userId: ResourceIdentifier;
  roomId: ResourceIdentifier;
}

export type LikesListParams = ControllerListParamsType<LikesFilterInterface>;
export type LikeListResult = ControllerListResultType<UserViewModel>;
