import { Transaction } from 'sequelize';
import { FanClubMemberRoleEnum, FanClubMemberStatusEnum, OrderEnum } from '@ultras/utils';
import { FanClubMemberViewModel } from '@ultras/view-models';

import resources from 'core/data/lcp';
import db from 'core/data/models';
import {
  ResourceIdentifier,
  ServiceByIdResultType,
  ServiceListParamsType,
  ServiceListResultType,
  ServiceResultType,
} from 'types';

import BaseService from './BaseService';
import FanClubService from './FanClubService';

interface MembershipInterface {
  fanClubId: ResourceIdentifier;
  memberId: ResourceIdentifier;
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
  inviterId?: ResourceIdentifier;
  memberId?: ResourceIdentifier;
}

interface RemoveMemberInterface extends Omit<MembershipInterface, 'memberId'> {
  memberId?: ResourceIdentifier;
  membershipId?: ResourceIdentifier;
}

export interface FanClubListParamsInterface {
  name?: string;
  countryId?: ResourceIdentifier;
  cityId?: ResourceIdentifier;
  teamId?: ResourceIdentifier;
  ownerId?: ResourceIdentifier;
}

export interface FanClubMembershipListParamsInterface {
  search?: string;
  roleId?: ResourceIdentifier;
  status?: FanClubMemberStatusEnum;
  fanClubId?: ResourceIdentifier;
  memberId?: ResourceIdentifier;
}

interface UpdateRoleStatusInterface {
  fanClubId: ResourceIdentifier;
  membershipId?: ResourceIdentifier;
  memberId?: ResourceIdentifier;
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
          ...FanClubService.getIncludeRelations(),
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

  /**
   * Add member to fan club.
   */
  static async add(
    { fanClubId, memberId, role, status }: CreateMemberInterface,
    transaction?: Transaction
  ): Promise<null | FanClubMemberViewModel> {
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
      await existingMember.restore({ transaction });

      // if is previous role is owner, then need to keep it
      const ownerRoleId = await this.getRoleId(FanClubMemberRoleEnum.owner);
      const previousRoleId = existingMember.getDataValue('roleId');

      if (ownerRoleId != previousRoleId) {
        existingMember.setDataValue('roleId', roleId);
      }

      // update status, because maybe user now joined to fan club
      // with another role/status
      existingMember.setDataValue('status', status);

      await existingMember.save({ transaction });

      return existingMember;
    }

    const newMember = db.FanClubMember.create(
      {
        fanClubId,
        memberId,
        roleId,
        status,
      },
      { transaction }
    );

    // update members count if membership status is not a pending
    const skipStatuses = [
      FanClubMemberStatusEnum.pendingInvitation,
      FanClubMemberStatusEnum.pendingRequest,
    ];

    if (!skipStatuses.includes(status)) {
      await FanClubService.updateMembersCount(fanClubId, transaction);
    }

    return newMember;
  }

  /**
   * Remove member from fan club.
   */
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

    await FanClubService.updateMembersCount(fanClubId);
  }

  /**
   * Get role id by role name.
   */
  static async getRoleId(
    roleName: FanClubMemberRoleEnum
  ): Promise<ResourceIdentifier | null> {
    const role = await db.FanClubMemberRole.findOne({
      where: { role: roleName },
    });

    if (!role) {
      return null;
    }

    return role.getDataValue('id') as ResourceIdentifier;
  }

  /**
   * Check if user has provided role(s)
   */
  static async isHasRole(
    fanClubId: ResourceIdentifier,
    memberId: ResourceIdentifier,
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

  // get membership by fan club id and member id
  static async getOne(fanClubId: ResourceIdentifier, memberId: ResourceIdentifier) {
    const fanClubMember = await db.FanClubMember.findOne({
      where: {
        fanClubId,
        memberId,
      },
      ...this.includeRelations(),
    });

    return fanClubMember;
  }

  /**
   * Check if user has provided status(es)
   */
  static async isHasStatus(
    fanClubId: ResourceIdentifier,
    memberId: ResourceIdentifier,
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

  /**
   * Update member role and/or status on fan club
   */
  static async updateStatusAndRole({
    fanClubId,
    membershipId,
    memberId,
    role,
    status,
  }: UpdateRoleStatusInterface) {
    const updateField: any = {};
    if (role) {
      const roleId = await this.getRoleId(role);
      updateField.roleId = roleId;
    }
    if (status) {
      updateField.status = status;
    }

    if (Object.keys(updateField).length == 0) {
      return;
    }

    const query = this.queryInit({
      fanClubId: fanClubId,
    });

    if (membershipId) {
      this.queryAppend(query, 'id', membershipId);
    }
    if (memberId) {
      this.queryAppend(query, 'memberId', memberId);
    }

    const result = await db.FanClubMember.update(updateField, {
      where: query,
      returning: true,
    });

    // update members count if user status was provided
    // and it's not a pending
    if (updateField.status) {
      const skipStatuses = [
        FanClubMemberStatusEnum.pendingInvitation,
        FanClubMemberStatusEnum.pendingRequest,
      ];

      if (!skipStatuses.includes(updateField.status)) {
        await FanClubService.updateMembersCount(fanClubId);
      }
    }

    return result;
  }

  /**
   * Get fan club membership by id.
   */
  static async getById(
    id: ResourceIdentifier
  ): ServiceByIdResultType<FanClubMemberViewModel> {
    return this.findById(db.FanClubMember, id);
  }

  /**
   * Get fan club memberships by provided filters.
   */
  static async getFanClubIdsForMember(
    memberId: ResourceIdentifier
  ): ServiceResultType<Array<ResourceIdentifier>> {
    const queryOptions = {
      where: {
        status: FanClubMemberStatusEnum.active,
        memberId,
      },
      attributes: ['fanClubId'],
    };

    const result = await db.FanClubMember.findAll(queryOptions);
    return result.map((member: any) => member.getDataValue('fanClubId'));
  }

  /**
   * Get fan club memberships by provided filters.
   */
  static async getAll(
    params: ServiceListParamsType<FanClubMembershipListParamsInterface>
  ): ServiceListResultType<FanClubMemberViewModel> {
    // fan club id or memberId must be provided
    if (!params.fanClubId && !params.memberId) {
      return { rows: [], count: 0 };
    }

    // build generic query options
    const queryOptions: any = {
      limit: params.limit,
      offset: params.offset,
      where: {},
      ...this.includeRelations(),
    };

    // add role based condition
    if (params.roleId) {
      queryOptions.where.roleId = params.roleId;
    }

    // add status based condition
    if (params.status) {
      queryOptions.where.status = params.status;
    }

    if (params.memberId) {
      queryOptions.where.memberId = params.memberId;
      queryOptions.order = [
        [resources.FAN_CLUB.ALIAS.SINGULAR, params.orderAttr || 'name', params.order],
      ];

      // if member id and search query provided then we need to search
      // in fan club fields
      if (params.search) {
        // remove fan club relation
        queryOptions.include = queryOptions.include.filter(
          (include: any) => include.as != resources.FAN_CLUB.ALIAS.SINGULAR
        );

        const searchCondition = ['name'].map(field => ({
          [field]: {
            [db.Sequelize.Op.iLike]: `%${params.search}%`,
          },
        }));

        // add fan club relation with search conditions
        queryOptions.include.push({
          model: db.FanClub,
          as: resources.FAN_CLUB.ALIAS.SINGULAR,
          required: true,
          where: searchCondition,
        });
      }
    } else if (params.fanClubId) {
      queryOptions.where.fanClubId = params.fanClubId;
      if (!params.orderAttr) {
        queryOptions.order = [
          ['member', 'fullname', params.order || OrderEnum.asc],
          ['member', 'username', params.order || OrderEnum.asc],
        ];
      } else {
        queryOptions.order = [
          ['member', params.orderAttr, params.order || OrderEnum.asc],
        ];
      }

      // if fan club id and search query provided then we need to search
      // in user fields
      if (params.search) {
        // remove member relation
        queryOptions.include = queryOptions.include.filter(
          (include: any) => include.as != 'member'
        );

        const searchCondition = ['email', 'fullname', 'username'].map(field => ({
          [field]: {
            [db.Sequelize.Op.iLike]: `%${params.search}%`,
          },
        }));

        // add member relation with search conditions
        queryOptions.include.push({
          model: db.User,
          as: 'member',
          required: true,
          where: {
            [db.Sequelize.Op.or]: searchCondition,
          },
        });
      }
    }

    // set alphabetical ordering using member.fullname,
    // in case of member.fullname is empty we need to order
    // using member.username
    if (!queryOptions.order) {
      queryOptions.order = [
        ['member', 'fullname', OrderEnum.asc],
        ['member', 'username', OrderEnum.asc],
      ];
    }

    const { rows, count } = await db.FanClubMember.findAndCountAll(queryOptions);
    return { rows, count };
  }
}

export default FanClubMemberService;
