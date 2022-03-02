import { FanClubMemberRoleEnum, FanClubMemberStatusEnum } from '@ultras/utils';
import { FanClubAttributes, FanClubCreationAttributes } from 'core/data/models/FanClub';

import resources from 'core/data/lcp';
import db from 'core/data/models';
import {
  DbIdentifier,
  ServiceByIdResultType,
  ServiceListParamsType,
  ServiceListResultType,
} from 'types';

import BaseService from './BaseService';

interface MembershipInterface {
  fanClubId: DbIdentifier;
  userId: DbIdentifier;
}
interface WithRoleInterface {
  role: FanClubMemberRoleEnum;
}
interface WithStatusInterface {
  status: FanClubMemberStatusEnum;
}

interface CreateMemberInterface
  extends MembershipInterface,
    WithRoleInterface,
    WithStatusInterface {}

export interface FanClubListParamsInterface {
  name?: string;
  countryId?: DbIdentifier;
  cityId?: DbIdentifier;
  teamId?: DbIdentifier;
  ownerId?: DbIdentifier;
}

class FanClubService extends BaseService {
  protected static includeRelations() {
    return {
      attributes: {
        exclude: ['cityId', 'countryId', 'teamId', 'ownerId'],
      },
      include: [
        {
          model: db.City,
          as: resources.CITY.ALIAS.SINGULAR,
        },
        {
          model: db.Country,
          as: resources.COUNTRY.ALIAS.SINGULAR,
        },
        {
          model: db.Team,
          as: resources.TEAM.ALIAS.SINGULAR,
        },
        {
          model: db.User,
          as: 'owner',
        },
      ],
    };
  }

  static async create({
    name,
    description,
    cityId,
    countryId,
    teamId,
    ownerId,
    avatar,
    coverPhoto,
    privacy,
  }: FanClubCreationAttributes) {
    const fanClub = await db.FanClub.create({
      name,
      description,
      cityId,
      countryId,
      teamId,
      ownerId,
      avatar,
      coverPhoto,
      privacy,
    });

    return fanClub;
  }

  // ownerId and teamId is not mutable
  static async update(
    id: DbIdentifier,
    {
      name,
      description,
      cityId,
      countryId,
      avatar,
      coverPhoto,
      privacy,
    }: Partial<Omit<FanClubCreationAttributes, 'teamId'>>
  ) {
    const fanClub = await db.FanClub.findOne({
      where: {
        id: id,
      },
    });

    if (name) {
      fanClub.setDataValue('name', name);
    }
    if (typeof description != 'undefined') {
      fanClub.setDataValue('description', description);
    }
    if (avatar) {
      fanClub.setDataValue('avatar', avatar);
    }
    if (typeof coverPhoto != 'undefined') {
      fanClub.setDataValue('coverPhoto', coverPhoto);
    }
    if (privacy) {
      fanClub.setDataValue('privacy', privacy);
    }

    // if cityId provided then countryId must be updated same time.
    if (cityId && countryId) {
      fanClub.setDataValue('cityId', cityId);
      fanClub.setDataValue('countryId', countryId);
    }

    await fanClub.save();
    return fanClub;
  }

  static async addMember({ fanClubId, userId, role, status }: CreateMemberInterface) {
    const existingMember = await db.FanClubMember.findOne({
      where: {
        fanClubId: fanClubId,
        userId: userId,
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
      userId,
      roleId,
      status,
    });

    return newMember;
  }

  static async removeMember({ fanClubId, userId }: MembershipInterface) {
    await db.FanClubMember.destroy({
      where: {
        fanClubId: fanClubId,
        userId: userId,
      },
    });
  }

  static async updateMemberRole(
    fanClubId: DbIdentifier,
    userId: DbIdentifier,
    role: FanClubMemberRoleEnum
  ) {
    await db.FanClubMember.update(
      {
        role: role,
      },
      {
        where: {
          fanClubId: fanClubId,
          userId: userId,
        },
      }
    );
  }

  static async updateMemberStatus(
    fanClubId: DbIdentifier,
    userId: DbIdentifier,
    status: FanClubMemberStatusEnum
  ) {
    await db.FanClubMember.update(
      {
        status: status,
      },
      {
        where: {
          fanClubId: fanClubId,
          userId: userId,
        },
      }
    );
  }

  static async getAll(
    params: ServiceListParamsType<FanClubListParamsInterface>
  ): ServiceListResultType<FanClubAttributes> {
    const query: any = this.queryInit();

    if (params.name) {
      this.queryAppend(query, 'name', {
        [db.Sequelize.Op.iLike]: `%${params.name}%`,
      });
    }

    if (params.countryId) {
      this.queryAppend(query, 'countryId', {
        [db.Sequelize.Op.eq]: params.countryId,
      });
    }

    if (params.cityId) {
      this.queryAppend(query, 'cityId', {
        [db.Sequelize.Op.eq]: params.cityId,
      });
    }

    if (params.teamId) {
      this.queryAppend(query, 'teamId', {
        [db.Sequelize.Op.eq]: params.teamId,
      });
    }

    return this.findAndCountAll(db.FanClub, query, params);
  }

  static async getById(id: DbIdentifier): ServiceByIdResultType<FanClubAttributes> {
    return this.findById(db.FanClub, id);
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
  static async isMemberHasRole(
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
  static async isMemberHasStatus(
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

export default FanClubService;
