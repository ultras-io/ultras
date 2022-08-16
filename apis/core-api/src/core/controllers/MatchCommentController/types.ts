import type { UserViewModel } from '@ultras/view-models';
import type { ControllerListParamsType, ControllerListResultType } from 'types';

export interface CommentsFilterInterface {
  matchId: ResourceIdentifier;
}

export interface CommentCreateParamsInterface {
  userId: ResourceIdentifier;
  matchId: ResourceIdentifier;
  content: string;
}
export interface CommentUpdateParamsInterface {
  userId: ResourceIdentifier;
  matchId: ResourceIdentifier;
  commentId: ResourceIdentifier;
  content: string;
}
export interface CommentDeleteParamsInterface {
  userId: ResourceIdentifier;
  matchId: ResourceIdentifier;
  commentId: ResourceIdentifier;
}

export type CommentsListParams = ControllerListParamsType<CommentsFilterInterface>;
export type CommentListResult = ControllerListResultType<UserViewModel>;
