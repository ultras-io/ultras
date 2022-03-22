import { FanClubMemberRoleEnum, FanClubMemberStatusEnum } from '@ultras/utils';
import { FanClubMemberViewModel } from '@ultras/view-models';
import {
  ControllerResultType,
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  DbIdentifier,
} from 'types';

interface FanClubFilterInterface {
  search?: string;
  roleId?: DbIdentifier;
  status?: FanClubMemberStatusEnum;
}

interface FanClubMembershipsFilterInterface extends FanClubFilterInterface {
  fanClubId: DbIdentifier;
}

interface FanClubMembershipsByMemberIdInterface extends FanClubFilterInterface {
  memberId: DbIdentifier;
}

export type InvitationsType = {
  email?: string;
  phone?: string;
  username?: string;
  id?: DbIdentifier;
  role: FanClubMemberRoleEnum;
};

export type FanClubMembershipInviteParams = {
  fanClubId: DbIdentifier;
  inviterId: DbIdentifier;
  invitations: InvitationsType | Array<InvitationsType>;
};

export type UpdatesType = {
  memberId?: DbIdentifier;
  membershipId?: DbIdentifier;
  role?: FanClubMemberRoleEnum;
  status?: FanClubMemberStatusEnum;
};

export type FanClubMembershipInviteResult = ControllerResultType<{
  membership?: FanClubMemberViewModel;
  memberships?: Array<FanClubMemberViewModel>;
}>;

export type FanClubMembershipUpdateParams = {
  fanClubId: DbIdentifier;
  updates: UpdatesType | Array<UpdatesType>;
};

export type FanClubMembershipUpdateResult = ControllerResultType<{
  membership?: FanClubMemberViewModel;
  memberships?: Array<FanClubMemberViewModel>;
}>;

export type FanClubMembershipDeleteByIdParams = {
  fanClubId: DbIdentifier;
  membershipId: DbIdentifier;
};

export type FanClubMembershipDeleteByIdResult = ControllerResultType<{
  success: boolean;
}>;

export type FanClubMembershipRequestParams = {
  fanClubId: DbIdentifier | Array<DbIdentifier>;
  memberId: DbIdentifier;
};

export type FanClubMembershipRequestResult = ControllerResultType<{
  membership?: FanClubMemberViewModel;
  memberships?: Array<FanClubMemberViewModel>;
}>;

export type FanClubMembershipActionParams = {
  fanClubId: DbIdentifier;
  membershipId?: DbIdentifier | Array<DbIdentifier>;
  memberId?: DbIdentifier | Array<DbIdentifier>;
};

export type FanClubMembershipActionResult = ControllerResultType<{
  success: boolean;
}>;

export type FanClubAcceptOrRejectInvitationParams = {
  fanClubId: DbIdentifier;
  membershipId: DbIdentifier;
  memberId?: DbIdentifier;
};
export type FanClubAcceptOrRejectInvitationResult = ControllerResultType<{
  success: boolean;
}>;

export type FanClubMembershipByIdParams = {
  fanClubId: DbIdentifier;
  membershipId: DbIdentifier;
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
