import { FanClubMemberRoleEnum, FanClubMemberStatusEnum } from '@ultras/utils';
import db from 'core/data/models';
import { Optional } from 'sequelize';
import { DbIdentifier } from 'types';
import { FanClub, FanClubCreationAttributes } from 'core/data/models/FanClub';

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

class FanClubService extends BaseService {
  static async create({
    name,
    description,
    cityId,
    countryId,
    teamId,
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
      avatar,
      coverPhoto,
      privacy,
    });

    return fanClub;
  }

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

    if (typeof name != 'undefined') {
      fanClub.setDataValue('name', name);
    }
    if (typeof description != 'undefined') {
      fanClub.setDataValue('description', description);
    }
    if (typeof avatar != 'undefined') {
      fanClub.setDataValue('avatar', avatar);
    }
    if (typeof coverPhoto != 'undefined') {
      fanClub.setDataValue('coverPhoto', coverPhoto);
    }
    if (typeof privacy != 'undefined') {
      fanClub.setDataValue('privacy', privacy);
    }

    // if cityId provided then countryId must be updated same time.
    if (typeof cityId != 'undefined') {
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

    // we need to restore deleted row if user was previously a member of a fan club
    if (existingMember) {
      // restore fan club and user membership
      await existingMember.restore();

      // update role/status, because maybe user now joined to fan club
      // with another role/status
      existingMember.setDataValue('status', status);
      existingMember.setDataValue('role', role);
      await existingMember.save();

      return existingMember;
    }

    const newMember = db.FanClubMember.create({
      fanClubId,
      userId,
      role,
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
}

export default FanClubService;
