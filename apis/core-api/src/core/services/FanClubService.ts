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
}

class FanClubService extends BaseService {
  protected static includeRelations() {
    return {
      attributes: {
        exclude: ['cityId', 'countryId', 'teamId'],
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
      ],
    };
  }

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
}

export default FanClubService;
