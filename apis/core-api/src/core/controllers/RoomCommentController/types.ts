import type { UserViewModel } from '@ultras/view-models';
import type { ControllerListParamsType, ControllerListResultType } from 'types';

export interface CommentsFilterInterface {
  roomId: ResourceIdentifier;
}

export interface CommentCreateParamsInterface {
  userId: ResourceIdentifier;
  roomId: ResourceIdentifier;
  content: string;
}
export interface CommentUpdateParamsInterface {
  userId: ResourceIdentifier;
  roomId: ResourceIdentifier;
  commentId: ResourceIdentifier;
  content: string;
}
export interface CommentDeleteParamsInterface {
  userId: ResourceIdentifier;
  roomId: ResourceIdentifier;
  commentId: ResourceIdentifier;
}

export type CommentsListParams = ControllerListParamsType<CommentsFilterInterface>;
export type CommentListResult = ControllerListResultType<UserViewModel>;
