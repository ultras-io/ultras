import type { UserViewModel } from '@ultras/view-models';
import type { ControllerListParamsType, ControllerListResultType } from 'types';

export interface ICommentsFilter {
  roomId: ResourceIdentifier;
}

export interface ICommentCreateParams {
  userId: ResourceIdentifier;
  roomId: ResourceIdentifier;
  content: string;
}
export interface ICommentUpdateParams {
  userId: ResourceIdentifier;
  roomId: ResourceIdentifier;
  commentId: ResourceIdentifier;
  content: string;
}
export interface ICommentDeleteParams {
  userId: ResourceIdentifier;
  roomId: ResourceIdentifier;
  commentId: ResourceIdentifier;
}

export type CommentsListParams = ControllerListParamsType<ICommentsFilter>;
export type CommentListResult = ControllerListResultType<UserViewModel>;
