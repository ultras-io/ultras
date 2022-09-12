import { UserViewModel } from './user';

export type RoomMemberViewModel = ViewModel<{
  user: UserViewModel;
}>;

export type RoomMembersViewModel = Array<RoomMemberViewModel>;
