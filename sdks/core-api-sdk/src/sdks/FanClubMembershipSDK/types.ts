import { FanClubMemberRoleEnum, FanClubMemberStatusEnum } from '@ultras/utils';
import { FanClubMembersViewModel, FanClubMemberViewModel } from '@ultras/view-models';
import { ApiResponseBodyType, ListResponseMetaType } from '../types';

export type ConfirmationResultType = {
  success: boolean;
};

// #region invite
type MembershipInviteIdentifierType = {
  email?: string;
  phone?: string;
  username?: string;
  id?: ResourceIdentifier;
};

export type FanClubMembershipInviteType = MembershipInviteIdentifierType & {
  role: FanClubMemberRoleEnum;
};

export type FanClubMembershipInviteBulkType = Array<FanClubMembershipInviteType>;

export type InvitationResponse = ApiResponseBodyType<{
  membership: FanClubMemberViewModel;
}>;
export type BulkInvitationResponse = ApiResponseBodyType<{
  memberships: FanClubMembersViewModel;
}>;
// #endregion

// #region request
export type FanClubMembershipRequestResponse = ApiResponseBodyType<{
  membership: FanClubMemberViewModel;
}>;

export type FanClubMembershipBulkRequestResponse = ApiResponseBodyType<{
  memberships: FanClubMembersViewModel;
}>;
// #endregion

// #region update
type MembershipUpdateIdentifierType = {
  membershipId?: ResourceIdentifier;
  memberId?: ResourceIdentifier;
};

export type FanClubMembershipUpdateType = {
  role?: FanClubMemberRoleEnum;
  status?: FanClubMemberStatusEnum;
};

export type FanClubMembershipUpdateBulkType = Array<
  MembershipUpdateIdentifierType & FanClubMembershipUpdateType
>;

export type UpdateMembershipResponse = ApiResponseBodyType<{
  membership: FanClubMemberViewModel;
}>;
export type BulkUpdateMembershipResponse = ApiResponseBodyType<{
  memberships: FanClubMembersViewModel;
}>;
// #endregion

// #region get
export type GetFanClubMembershipsFilter = {
  search?: string;
  roleId?: FanClubMemberRoleEnum;
  status?: FanClubMemberStatusEnum;
};
export type GetMembershipResponse = ApiResponseBodyType<FanClubMemberViewModel>;
export type GetMembershipsResponse = ApiResponseBodyType<
  FanClubMembersViewModel,
  ListResponseMetaType
>;
// #endregion

// #region remove
export type RemoveMembershipBulkType = {
  membershipIds?: Array<ResourceIdentifier>;
  memberIds?: Array<ResourceIdentifier>;
};
// #endregion
