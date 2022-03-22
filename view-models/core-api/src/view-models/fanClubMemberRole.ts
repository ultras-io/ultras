import { FanClubMemberRoleEnum } from '@ultras/utils';

export type FanClubMemberRoleViewModel = ViewModel<{
  role: FanClubMemberRoleEnum;
  description: string;
}>;
