import { FanClubMemberRoleEnum, FanClubMemberStatusEnum } from '@ultras/utils';
import { FanClubMemberViewModel } from '@ultras/view-models';
import {
  ControllerResultType,
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ResourceIdentifier,
} from 'types';

interface FanClubFilterInterface {
  search?: string;
  roleId?: ResourceIdentifier;
  status?: FanClubMemberStatusEnum;
}

interface FanClubMembershipsFilterInterface extends FanClubFilterInterface {
  fanClubId: ResourceIdentifier;
}

interface FanClubMembershipsByMemberIdInterface extends FanClubFilterInterface {
  memberId: ResourceIdentifier;
}

export type InvitationsType = {
  email?: string;
  phone?: string;
  username?: string;
  id?: ResourceIdentifier;
  role: FanClubMemberRoleEnum;
};

export type FanClubMembershipInviteParams = {
  fanClubId: ResourceIdentifier;
  inviterId: ResourceIdentifier;
  invitations: InvitationsType | Array<InvitationsType>;
};

export type UpdatesType = {
  memberId?: ResourceIdentifier;
  membershipId?: ResourceIdentifier;
  role?: FanClubMemberRoleEnum;
  status?: FanClubMemberStatusEnum;
};

export type FanClubMembershipInviteResult = ControllerResultType<{
  membership?: FanClubMemberViewModel;
  memberships?: Array<FanClubMemberViewModel>;
}>;

export type FanClubMembershipUpdateParams = {
  fanClubId: ResourceIdentifier;
  updates: UpdatesType | Array<UpdatesType>;
};

export type FanClubMembershipUpdateResult = ControllerResultType<{
  membership?: FanClubMemberViewModel;
  memberships?: Array<FanClubMemberViewModel>;
}>;

export type FanClubMembershipDeleteByIdParams = {
  fanClubId: ResourceIdentifier;
  membershipId: ResourceIdentifier;
};

export type FanClubMembershipDeleteByIdResult = ControllerResultType<{
  success: boolean;
}>;

export type FanClubMembershipRequestParams = {
  fanClubId: ResourceIdentifier | Array<ResourceIdentifier>;
  memberId: ResourceIdentifier;
};

export type FanClubMembershipRequestResult = ControllerResultType<{
  membership?: FanClubMemberViewModel;
  memberships?: Array<FanClubMemberViewModel>;
}>;

export type FanClubMembershipActionParams = {
  fanClubId: ResourceIdentifier;
  membershipId?: ResourceIdentifier | Array<ResourceIdentifier>;
  memberId?: ResourceIdentifier | Array<ResourceIdentifier>;
};

export type FanClubMembershipActionResult = ControllerResultType<{
  success: boolean;
}>;

export type FanClubAcceptOrRejectInvitationParams = {
  fanClubId: ResourceIdentifier;
  membershipId?: ResourceIdentifier;
  memberId?: ResourceIdentifier;
};
export type FanClubAcceptOrRejectInvitationResult = ControllerResultType<{
  success: boolean;
}>;

export type FanClubMembershipByIdParams = {
  fanClubId: ResourceIdentifier;
  membershipId: ResourceIdentifier;
};
export type FanClubMembershipByIdResult =
  ControllerByIdResultType<FanClubMemberViewModel>;

export type FanClubMembershipsListParams =
  ControllerListParamsType<FanClubMembershipsFilterInterface>;
export type FanClubMembershipsListResult =
  ControllerListResultType<FanClubMemberViewModel>;

export type FanClubMembershipsByMemberIdListParams =
  ControllerListParamsType<FanClubMembershipsByMemberIdInterface>;
export type FanClubMembershipsByMemberIdListResult =
  ControllerListResultType<FanClubMemberViewModel>;
