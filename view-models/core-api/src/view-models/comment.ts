import type { BaseUserViewModel } from './user';

export type CommentViewModel = ViewModel<{
  content: string;
  edited: boolean;
  user: BaseUserViewModel;
}>;
