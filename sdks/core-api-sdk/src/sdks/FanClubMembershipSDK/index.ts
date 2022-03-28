import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, DynamicQueryParam, DbIdentifier } from '../types';
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

export class FanClubMembershipSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'fan-clubs');
  }

  // #region actions by admin/owner
  public invite(fanClubId: DbIdentifier, params: FanClubMembershipInviteType) {
    return this.api?.makeAPIPostRequest<InvitationResponse>(
      `${fanClubId}/memberships/invite-member`,
      {
        body: params,
      }
    );
  }

  public bulkInvite(fanClubId: DbIdentifier, params: FanClubMembershipInviteBulkType) {
    return this.api?.makeAPIPostRequest<BulkInvitationResponse>(
      `${fanClubId}/memberships/invite-member`,
      {
        body: params,
      }
    );
  }

  public update(
    fanClubId: DbIdentifier,
    membershipId: DbIdentifier,
    params: FanClubMembershipUpdateType
  ) {
    return this.api?.makeAPIPatchRequest<UpdateMembershipResponse>(
      `${fanClubId}/memberships/${membershipId}`,
      {
        body: params,
      }
    );
  }

  public bulkUpdate(fanClubId: DbIdentifier, params: FanClubMembershipUpdateBulkType) {
    return this.api?.makeAPIPatchRequest<BulkUpdateMembershipResponse>(
      `${fanClubId}/memberships`,
      {
        body: params,
      }
    );
  }

  public getAll(
    fanClubId: DbIdentifier,
    params: QueryParam<GetFanClubMembershipsFilter>
  ) {
    return this.api?.makeAPIGetRequest<GetMembershipsResponse>(
      `${fanClubId}/memberships`,
      {
        query_params: params as DynamicQueryParam,
      }
    );
  }

  public getById(fanClubId: DbIdentifier, membershipId: DbIdentifier) {
    return this.api?.makeAPIGetRequest<GetMembershipResponse>(
      `${fanClubId}/memberships/${membershipId}`
    );
  }

  public remove(fanClubId: DbIdentifier, membershipId: DbIdentifier) {
    return this.api?.makeAPIDeleteRequest(`${fanClubId}/memberships/${membershipId}`);
  }

  public removeBulk(fanClubId: DbIdentifier, params: RemoveMembershipBulkType) {
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

  public acceptRequest(fanClubId: DbIdentifier, membershipId: DbIdentifier) {
    return this.api?.makeAPIPatchRequest<ConfirmationResultType>(
      `${fanClubId}/memberships/${membershipId}/accept-request`
    );
  }

  public rejectRequest(fanClubId: DbIdentifier, membershipId: DbIdentifier) {
    return this.api?.makeAPIPatchRequest<ConfirmationResultType>(
      `${fanClubId}/memberships/${membershipId}/accept-request`
    );
  }
  // #endregion

  // #region admin/member actions
  public leaveFanClub(fanClubId: DbIdentifier, membershipId: DbIdentifier) {
    return this.api?.makeAPIPatchRequest<ConfirmationResultType>(
      `${fanClubId}/memberships/${membershipId}/leave`
    );
  }
  // #endregion

  // #region member actions
  public acceptInvitation(fanClubId: DbIdentifier, membershipId: DbIdentifier) {
    return this.api?.makeAPIPatchRequest<ConfirmationResultType>(
      `${fanClubId}/memberships/${membershipId}/accept-invitation`
    );
  }

  public rejectInvitation(fanClubId: DbIdentifier, membershipId: DbIdentifier) {
    return this.api?.makeAPIPatchRequest<ConfirmationResultType>(
      `${fanClubId}/memberships/${membershipId}/reject-invitation`
    );
  }

  public requestJoin(fanClubId: DbIdentifier) {
    return this.api?.makeAPIPostRequest<FanClubMembershipRequestResponse>(
      `${fanClubId}/memberships/join`
    );
  }

  public requestBulkJoin(fanClubId: DbIdentifier) {
    return this.api?.makeAPIPostRequest<FanClubMembershipBulkRequestResponse>(
      `${fanClubId}/memberships/join`
    );
  }
  // #endregion
}
