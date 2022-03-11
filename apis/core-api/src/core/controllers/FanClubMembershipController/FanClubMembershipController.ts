import { FanClubMemberStatusEnum } from '@ultras/utils';
import { DbIdentifier } from 'types';
import BaseController from 'core/controllers/BaseController';
import { FanClubMemberAttributes } from 'core/data/models/FanClubMember';
import { FanClubMemberService, UserService } from 'core/services';

import {
  FanClubMembershipInviteParams,
  FanClubMembershipInviteResult,
  FanClubMembershipDeleteByIdParams,
  FanClubMembershipDeleteByIdResult,
  FanClubMembershipActionParams,
  FanClubMembershipActionResult,
  InvitationsType,
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
}

export default FanClubMembershipController;
