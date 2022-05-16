import { FanClubAttributes, FanClubCreationAttributes } from 'core/data/models/FanClub';

import resources from 'core/data/lcp';
import db from 'core/data/models';
import {
  ResourceIdentifier,
  ServiceByIdResultType,
  ServiceListParamsType,
  ServiceListResultType,
} from 'types';

import BaseService from './BaseService';
import { FanClubMemberStatusEnum } from '@ultras/utils';

export interface FanClubListParamsInterface {
  name?: string;
  countryId?: ResourceIdentifier;
  cityId?: ResourceIdentifier;
  teamId?: ResourceIdentifier;
  ownerId?: ResourceIdentifier;
}

export interface FanClubMembershipListParamsInterface {
  name: string;
  fanClubId: ResourceIdentifier;
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

  /**
   * Create fan club.
   */
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

  /**
   * Update fan club.
   *
   * @important ownerId and teamId is not mutable
   */
  static async update(
    id: ResourceIdentifier,
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

  /**
   * Get fan clubs by provided filter data and pagination.
   */
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

  /**
   * Get fan club by their ID.
   */
  static async getById(id: ResourceIdentifier): ServiceByIdResultType<FanClubAttributes> {
    return this.findById(db.FanClub, id);
  }

  /**
   * Get check fan club exists.
   */
  static async exists(id: ResourceIdentifier): ServiceByIdResultType<boolean> {
    return this.checkExistsById(db.FanClub, id);
  }

  /**
   * Update fun club's members count.
   *
   * If members status is a pending then it will not be included
   * in fan club as member.
   */
  static async updateMembersCount(id: ResourceIdentifier) {
    const fanClub = await db.FanClub.findByPk(id);
    if (!fanClub) {
      return;
    }

    const skipStatusList = [
      FanClubMemberStatusEnum.pendingInvitation,
      FanClubMemberStatusEnum.pendingInvitation,
    ];

    const membersCount = await db.FanClubMember.count({
      where: {
        fanClubId: id,
        status: {
          [db.Sequelize.Op.notIn]: skipStatusList,
        },
      },
    });

    fanClub.setDataValue('membersCount', membersCount);
    await fanClub.save();
  }
}

export default FanClubService;
