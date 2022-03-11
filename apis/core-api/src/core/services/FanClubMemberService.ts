import { FanClubMemberRoleEnum, FanClubMemberStatusEnum } from '@ultras/utils';

import resources from 'core/data/lcp';
import db from 'core/data/models';
import { FanClubMemberAttributes } from 'core/data/models/FanClubMember';
import {
  DbIdentifier,
  ServiceByIdResultType,
  ServiceListParamsType,
  ServiceListResultType,
} from 'types';

import BaseService from './BaseService';

interface MembershipInterface {
  fanClubId: DbIdentifier;
  memberId: DbIdentifier;
}
interface WithRoleInterface {
  role: FanClubMemberRoleEnum;
}
interface WithStatusInterface {
  status: FanClubMemberStatusEnum;
}

interface CreateMemberInterface
  extends Omit<MembershipInterface, 'memberId'>,
    WithRoleInterface,
    WithStatusInterface {
  inviterId?: DbIdentifier;
  memberId?: DbIdentifier;
}

interface RemoveMemberInterface extends Omit<MembershipInterface, 'memberId'> {
  memberId?: DbIdentifier;
  membershipId?: DbIdentifier;
}

export interface FanClubListParamsInterface {
  name?: string;
  countryId?: DbIdentifier;
  cityId?: DbIdentifier;
  teamId?: DbIdentifier;
  ownerId?: DbIdentifier;
}

export interface FanClubMembershipListParamsInterface {
  search?: string;
  roleId?: DbIdentifier;
  status?: FanClubMemberStatusEnum;
  fanClubId?: DbIdentifier;
  memberId?: DbIdentifier;
}

interface UpdateRoleStatusInterface {
  fanClubId: DbIdentifier;
  membershipId?: DbIdentifier;
  memberId?: DbIdentifier;
  role?: FanClubMemberRoleEnum;
  status?: FanClubMemberStatusEnum;
}

class FanClubMemberService extends BaseService {
  protected static includeRelations() {
    return {
      attributes: {
        exclude: ['fanClubId', 'memberId', 'roleId'],
      },
      include: [
        {
          model: db.FanClub,
          as: resources.FAN_CLUB.ALIAS.SINGULAR,
        },
        {
          model: db.User,
          as: 'member',
        },
        {
          model: db.FanClubMemberRole,
          as: resources.FAN_CLUB_MEMBER_ROLE.ALIAS.SINGULAR,
        },
      ],
    };
  }

  static async add({
    fanClubId,
    memberId,
    role,
    status,
  }: CreateMemberInterface): Promise<null | FanClubMemberAttributes> {
    const existingMember = await db.FanClubMember.findOne({
      where: {
        fanClubId: fanClubId,
        memberId: memberId,
      },
      paranoid: false,
    });

    const roleId = await this.getRoleId(role);

    // we need to restore deleted row if user was previously a member of a fan club
    if (existingMember) {
      // restore fan club and user membership
      await existingMember.restore();

      // update role/status, because maybe user now joined to fan club
      // with another role/status
      existingMember.setDataValue('status', status);
      existingMember.setDataValue('roleId', roleId);
      await existingMember.save();

      return existingMember;
    }

    const newMember = db.FanClubMember.create({
      fanClubId,
      memberId,
      roleId,
      status,
    });

    return newMember;
  }

  static async remove({ fanClubId, membershipId, memberId }: RemoveMemberInterface) {
    const conditions: any = {
      fanClubId: fanClubId,
    };

    if (membershipId) {
      conditions.id = membershipId;
    }
    if (memberId) {
      conditions.memberId = memberId;
    }

    await db.FanClubMember.destroy({
      where: conditions,
    });
  }

  static async getRoleId(roleName: FanClubMemberRoleEnum): Promise<DbIdentifier | null> {
    const role = await db.FanClubMemberRole.findOne({
      where: { role: roleName },
    });

    if (!role) {
      return null;
    }

    return role.getDataValue('id') as DbIdentifier;
  }

  // check if user has provided role(s)
  static async isHasRole(
    fanClubId: DbIdentifier,
    memberId: DbIdentifier,
    roles: FanClubMemberRoleEnum | Array<FanClubMemberRoleEnum>
  ): Promise<boolean> {
    if (!Array.isArray(roles)) {
      roles = [roles];
    }

    // get member in fan club with their role relation
    const fanClubMember = await db.FanClubMember.findOne({
      where: {
        fanClubId,
        memberId,
      },
      include: [
        {
          model: db.FanClubMemberRole,
          as: resources.FAN_CLUB_MEMBER_ROLE.ALIAS.SINGULAR,
          require: true,
          select: ['role'],
        },
      ],
    });

    // it's not a fan club member
    if (!fanClubMember) {
      return false;
    }

    const role = fanClubMember.getDataValue('fanClubMemberRole').getDataValue('role');
    return roles.includes(role);
  }

  // check if user has provided status(es)
  static async isHasStatus(
    fanClubId: DbIdentifier,
    memberId: DbIdentifier,
    statuses: FanClubMemberStatusEnum | Array<FanClubMemberStatusEnum>
  ): Promise<boolean> {
    if (!Array.isArray(statuses)) {
      statuses = [statuses];
    }

    const fanClubMember = await db.FanClubMember.findOne({
      where: {
        fanClubId,
        memberId,
      },
    });

    // it's not a fan club member
    if (!fanClubMember) {
      return false;
    }

    const status = fanClubMember.getDataValue('status');
    return statuses.includes(status);
  }
}

export default FanClubMemberService;
