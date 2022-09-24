import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, DynamicQueryParam, ResourceIdentifier } from '../types';
import {
  FanClubMembershipInviteType,
  FanClubMembershipInviteBulkType,
  FanClubMembershipUpdateType,
  FanClubMembershipUpdateBulkType,
  GetFanClubMembershipsFilter,
  RemoveMembershipBulkType,
  InvitationResponse,
  BulkInvitationResponse,
  UpdateMembershipResponse,
  BulkUpdateMembershipResponse,
  GetMembershipResponse,
  GetMembershipsResponse,
  ConfirmationResultType,
  FanClubMembershipRequestResponse,
  FanClubMembershipBulkRequestResponse,
} from './types';

export * from './types';

export class FanClubMembershipSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'fan-clubs');
  }

  // #region actions by admin/owner
  public invite(fanClubId: ResourceIdentifier, params: FanClubMembershipInviteType) {
    return this.api?.makeAPIPostRequest<InvitationResponse>(
      `${fanClubId}/memberships/invite-member`,
      {
        body: params,
      }
    );
  }

  public bulkInvite(
    fanClubId: ResourceIdentifier,
    params: FanClubMembershipInviteBulkType
  ) {
    return this.api?.makeAPIPostRequest<BulkInvitationResponse>(
      `${fanClubId}/memberships/invite-member`,
      {
        body: params,
      }
    );
  }

  public update(
    fanClubId: ResourceIdentifier,
    membershipId: ResourceIdentifier,
    params: FanClubMembershipUpdateType
  ) {
    return this.api?.makeAPIPatchRequest<UpdateMembershipResponse>(
      `${fanClubId}/memberships/${membershipId}`,
      {
        body: params,
      }
    );
  }

  public bulkUpdate(
    fanClubId: ResourceIdentifier,
    params: FanClubMembershipUpdateBulkType
  ) {
    return this.api?.makeAPIPatchRequest<BulkUpdateMembershipResponse>(
      `${fanClubId}/memberships`,
      {
        body: params,
      }
    );
  }

  public getAll(
    fanClubId: ResourceIdentifier,
    params: QueryParam<GetFanClubMembershipsFilter>
  ) {
    return this.api?.makeAPIGetRequest<GetMembershipsResponse>(
      `${fanClubId}/memberships`,
      {
        query_params: params as DynamicQueryParam,
      }
    );
  }

  public getById(fanClubId: ResourceIdentifier, membershipId: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest<GetMembershipResponse>(
      `${fanClubId}/memberships/${membershipId}`
    );
  }

  public remove(fanClubId: ResourceIdentifier, membershipId: ResourceIdentifier) {
    return this.api?.makeAPIDeleteRequest(`${fanClubId}/memberships/${membershipId}`);
  }

  public removeBulk(fanClubId: ResourceIdentifier, params: RemoveMembershipBulkType) {
    const queryParams: any = {};
    if (params.membershipIds && Array.isArray(params.membershipIds)) {
      queryParams.ids = params.membershipIds.join(',');
    }
    if (params.memberIds && Array.isArray(params.memberIds)) {
      queryParams.memberIds = params.memberIds.join(',');
    }

    return this.api?.makeAPIDeleteRequest(`${fanClubId}/memberships/`, {
      query_params: queryParams as DynamicQueryParam,
    });
  }

  public acceptRequest(fanClubId: ResourceIdentifier, membershipId: ResourceIdentifier) {
    return this.api?.makeAPIPatchRequest<ConfirmationResultType>(
      `${fanClubId}/memberships/${membershipId}/accept-request`
    );
  }

  public rejectRequest(fanClubId: ResourceIdentifier, membershipId: ResourceIdentifier) {
    return this.api?.makeAPIPatchRequest<ConfirmationResultType>(
      `${fanClubId}/memberships/${membershipId}/reject-request`
    );
  }
  // #endregion

  // #region admin/member actions
  public leaveFanClub(
    fanClubId: ResourceIdentifier,
    membershipId?: ResourceIdentifier | undefined
  ) {
    const leaveFanClubUrl = membershipId
      ? `${fanClubId}/memberships/${membershipId}/leave`
      : `${fanClubId}/memberships/leave`;

    return this.api?.makeAPIDeleteRequest<ConfirmationResultType>(leaveFanClubUrl);
  }
  // #endregion

  // #region member actions
  public acceptInvitation(
    fanClubId: ResourceIdentifier,
    membershipId?: ResourceIdentifier
  ) {
    const url = membershipId
      ? `${fanClubId}/memberships/${membershipId}/accept-invitation`
      : `${fanClubId}/memberships/accept-invitation`;

    return this.api?.makeAPIPatchRequest<ConfirmationResultType>(url);
  }

  public rejectInvitation(
    fanClubId: ResourceIdentifier,
    membershipId?: ResourceIdentifier
  ) {
    const url = membershipId
      ? `${fanClubId}/memberships/${membershipId}/reject-invitation`
      : `${fanClubId}/memberships/reject-invitation`;

    return this.api?.makeAPIPatchRequest<ConfirmationResultType>(url);
  }

  public requestJoin(fanClubId: ResourceIdentifier) {
    return this.api?.makeAPIPostRequest<FanClubMembershipRequestResponse>(
      `${fanClubId}/memberships/join`
    );
  }

  public requestBulkJoin(fanClubId: ResourceIdentifier) {
    return this.api?.makeAPIPostRequest<FanClubMembershipBulkRequestResponse>(
      `${fanClubId}/memberships/join`
    );
  }
  // #endregion
}
