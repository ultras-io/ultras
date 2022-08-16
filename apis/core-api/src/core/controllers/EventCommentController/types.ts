import type { UserViewModel } from '@ultras/view-models';
import type { ControllerListParamsType, ControllerListResultType } from 'types';

export interface CommentsFilterInterface {
  eventId: ResourceIdentifier;
}

export interface CommentCreateParamsInterface {
  userId: ResourceIdentifier;
  eventId: ResourceIdentifier;
  content: string;
}
export interface CommentUpdateParamsInterface {
  userId: ResourceIdentifier;
  eventId: ResourceIdentifier;
  commentId: ResourceIdentifier;
  content: string;
}
export interface CommentDeleteParamsInterface {
  userId: ResourceIdentifier;
  eventId: ResourceIdentifier;
  commentId: ResourceIdentifier;
}

export type CommentsListParams = ControllerListParamsType<CommentsFilterInterface>;
export type CommentListResult = ControllerListResultType<UserViewModel>;
