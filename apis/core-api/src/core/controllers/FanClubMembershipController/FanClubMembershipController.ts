import { FanClubMemberStatusEnum, OrderEnum } from '@ultras/utils';
import { DbIdentifier } from 'types';
import BaseController from 'core/controllers/BaseController';
import { FanClubMemberAttributes } from 'core/data/models/FanClubMember';
import { FanClubMemberService, UserService } from 'core/services';
import { ResourceNotFoundError } from 'modules/exceptions';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import {
  FanClubMembershipInviteParams,
  FanClubMembershipInviteResult,
  FanClubMembershipUpdateParams,
  FanClubMembershipUpdateResult,
  FanClubMembershipDeleteByIdParams,
  FanClubMembershipDeleteByIdResult,
  FanClubMembershipActionParams,
  FanClubMembershipActionResult,
  FanClubMembershipByIdParams,
  FanClubMembershipByIdResult,
  FanClubMembershipsListParams,
  FanClubMembershipsListResult,
  FanClubMembershipsByMemberIdListParams,
  FanClubMembershipsByMemberIdListResult,
  InvitationsType,
  UpdatesType,
} from './types';

class FanClubMembershipController extends BaseController {
  static async invite({
    fanClubId,
    inviterId,
    invitations,
  }: FanClubMembershipInviteParams): FanClubMembershipInviteResult {
    let isBulkAction = true;
    if (!Array.isArray(invitations)) {
      isBulkAction = false;
      invitations = [invitations];
    }

    const invitationsCast = invitations as Array<InvitationsType>;
    const promises = invitationsCast.map((invitation: InvitationsType) => {
      return new Promise<null | FanClubMemberAttributes>(async resolve => {
        let memberId: null | DbIdentifier = invitation.id || null;

        // if user id not provided we need to find user by their another identifier:
        // email, phone number, username
        if (!memberId) {
          let user = await UserService.findByUniqueIdentifier({
            email: invitation.email,
            phone: invitation.phone,
            username: invitation.username,
          });

          // if user not found by identifier then we need to create a new user
          // and send invitation
          //
          // we can invite user by email or phone only.
          if (!user) {
            if (invitation.email) {
              user = await UserService.createUserFromInvitationByEmail(invitation.email);
            } else if (invitation.phone) {
              user = await UserService.createUserFromInvitationByPhone(invitation.phone);
            }
          }

          if (!user) {
            return resolve(null);
          }

          memberId = user?.getDataValue('id');
        }

        // if we can't detect user id in previous steps then user invitation
        // must be ignored
        if (!memberId) {
          return resolve(null);
        }

        try {
          const member = await FanClubMemberService.add({
            fanClubId,
            inviterId,
            status: FanClubMemberStatusEnum.pendingInvitation,
            role: invitation.role,
            memberId: memberId,
          });

          resolve(member);
        } catch (e) {
          resolve(null);
        }
      });
    });

    const membershipsResult = await Promise.all(promises);
    const memberships = membershipsResult
      .filter(membership => !!membership)
      .map(membership => membership as FanClubMemberAttributes);

    if (isBulkAction) {
      return {
        data: {
          memberships: memberships,
        },
      };
    }

    return {
      data: {
        membership: memberships[0],
      },
    };
  }

  static async removeMember({
    fanClubId,
    membershipId,
    memberId,
  }: FanClubMembershipActionParams): FanClubMembershipActionResult {
    const promises: Array<Promise<void>> = [];

    if (membershipId) {
      if (!Array.isArray(membershipId)) {
        membershipId = [membershipId];
      }

      membershipId.forEach(id => {
        const promise = FanClubMemberService.remove({
          fanClubId,
          membershipId: id,
        });

        promises.push(promise);
      });
    }

    if (memberId) {
      if (!Array.isArray(memberId)) {
        memberId = [memberId];
      }

      memberId.forEach(id => {
        const promise = FanClubMemberService.remove({
          fanClubId,
          memberId: id,
        });

        promises.push(promise);
      });
    }

    await Promise.all(promises);

    return {
      data: {
        success: true,
      },
    };
  }

  static async removeMemberById({
    fanClubId,
    membershipId,
  }: FanClubMembershipDeleteByIdParams): FanClubMembershipDeleteByIdResult {
    await FanClubMemberService.remove({
      fanClubId,
      membershipId,
    });

    return {
      data: {
        success: true,
      },
    };
  }

  static async update({
    fanClubId,
    updates,
  }: FanClubMembershipUpdateParams): FanClubMembershipUpdateResult {
    let isBulkAction = true;
    if (!Array.isArray(updates)) {
      isBulkAction = false;
      updates = [updates];
    }

    const updatesCast = updates as Array<InvitationsType>;
    const promises = updatesCast.map((update: UpdatesType) => {
      return FanClubMemberService.updateStatusAndRole({
        fanClubId,
        status: update.status,
        role: update.role,
        membershipId: update.membershipId,
        memberId: update.memberId,
      });
    });

    const membershipsUpdateResult = await Promise.all(promises);
    const memberships = membershipsUpdateResult
      .map(membership => membership as [number, Array<FanClubMemberAttributes>])
      .map(membershipInfo => {
        if (Array.isArray(membershipInfo[1]) && membershipInfo[1].length > 0) {
          return membershipInfo[1][0];
        }
        return null;
      })
      .filter(membership => !!membership) as Array<FanClubMemberAttributes>;

    if (isBulkAction) {
      return {
        data: {
          memberships: memberships,
        },
      };
    }

    return {
      data: {
        membership: memberships[0],
      },
    };
  }

  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = '',
    order = OrderEnum.asc,
    search,
    roleId,
    status,
    fanClubId,
  }: FanClubMembershipsListParams): FanClubMembershipsListResult {
    const { rows, count } = await FanClubMemberService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      search,
      roleId,
      status,
      fanClubId,
    });

    return {
      data: rows,
      count,
      limit,
      offset,
    };
  }

  static async getById({
    membershipId,
  }: FanClubMembershipByIdParams): FanClubMembershipByIdResult {
    const fanClub = await FanClubMemberService.getById(membershipId);

    if (!fanClub) {
      throw new ResourceNotFoundError({
        message: 'Fan club and user membership not found.',
      });
    }

    return {
      data: fanClub,
    };
  }

  static async getByMemberId({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'name',
    order = OrderEnum.asc,
    search,
    roleId,
    status,
    memberId,
  }: FanClubMembershipsByMemberIdListParams): FanClubMembershipsByMemberIdListResult {
    const { rows, count } = await FanClubMemberService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      search,
      roleId,
      status,
      memberId,
    });

    return {
      data: rows,
      count,
      limit,
      offset,
    };
  }
}

export default FanClubMembershipController;
