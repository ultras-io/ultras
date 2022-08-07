import type { UserViewModel } from '@ultras/view-models';
import type { ControllerListParamsType, ControllerListResultType } from 'types';

export interface LikesFilterInterface {
  matchId: ResourceIdentifier;
}

export interface LikeUnlikeParamsInterface {
  userId: ResourceIdentifier;
  matchId: ResourceIdentifier;
}

export type LikesListParams = ControllerListParamsType<LikesFilterInterface>;
export type LikeListResult = ControllerListResultType<UserViewModel>;
