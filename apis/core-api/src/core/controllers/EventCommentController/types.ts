import type { UserViewModel } from '@ultras/view-models';
import type { ControllerListParamsType, ControllerListResultType } from 'types';

export interface ICommentsFilter {
  eventId: ResourceIdentifier;
}

export interface ICommentCreateParams {
  userId: ResourceIdentifier;
  eventId: ResourceIdentifier;
  content: string;
}
export interface ICommentUpdateParams {
  userId: ResourceIdentifier;
  eventId: ResourceIdentifier;
  commentId: ResourceIdentifier;
  content: string;
}
export interface ICommentDeleteParams {
  userId: ResourceIdentifier;
  eventId: ResourceIdentifier;
  commentId: ResourceIdentifier;
}

export type CommentsListParams = ControllerListParamsType<ICommentsFilter>;
export type CommentListResult = ControllerListResultType<UserViewModel>;
