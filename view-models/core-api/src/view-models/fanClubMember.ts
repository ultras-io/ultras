import { FanClubMemberStatusEnum } from '@ultras/utils';
import { FanClubViewModel } from './fanClub';
import { FanClubMemberRoleViewModel } from './fanClubMemberRole';
import { UserViewModel } from './user';

export type FanClubMemberViewModel = ViewModel<{
  fanClub: FanClubViewModel;
  member: UserViewModel;
  role: FanClubMemberRoleViewModel;
  status: FanClubMemberStatusEnum;
}>;

export type FanClubMembersViewModel = Array<FanClubMemberViewModel>;
