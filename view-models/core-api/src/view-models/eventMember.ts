import { UserViewModel } from './user';

export type EventMemberViewModel = ViewModel<{
  user: UserViewModel;
}>;

export type EventMembersViewModel = Array<EventMemberViewModel>;
