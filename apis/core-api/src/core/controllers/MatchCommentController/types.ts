import type { UserViewModel } from '@ultras/view-models';
import type { ControllerListParamsType, ControllerListResultType } from 'types';

export interface ICommentsFilter {
  matchId: ResourceIdentifier;
}

export interface ICommentCreateParams {
  userId: ResourceIdentifier;
  matchId: ResourceIdentifier;
  content: string;
}
export interface ICommentUpdateParams {
  userId: ResourceIdentifier;
  matchId: ResourceIdentifier;
  commentId: ResourceIdentifier;
  content: string;
}
export interface ICommentDeleteParams {
  userId: ResourceIdentifier;
  matchId: ResourceIdentifier;
  commentId: ResourceIdentifier;
}

export type CommentsListParams = ControllerListParamsType<ICommentsFilter>;
export type CommentListResult = ControllerListResultType<UserViewModel>;
