import { Transaction } from 'sequelize';
import { FanClubMemberStatusEnum, FanClubPrivacyEnum, OrderEnum } from '@ultras/utils';
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
import CityService from './CityService';
import CountryService from './CountryService';
import TeamService from './TeamService';

export interface FanClubListParamsInterface {
  userId?: null | ResourceIdentifier;
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
        // exclude: ['cityId', 'countryId', 'teamId', 'ownerId'],
      },
      include: [
        {
          model: db.City,
          as: resources.CITY.ALIAS.SINGULAR,
          ...CityService.getIncludeRelations(),
        },
        {
          model: db.Country,
          as: resources.COUNTRY.ALIAS.SINGULAR,
          ...CountryService.getIncludeRelations(),
        },
        {
          model: db.Team,
          as: resources.TEAM.ALIAS.SINGULAR,
          // ...TeamService.getIncludeRelations(),
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
  static async create(
    {
      shortName,
      name,
      description,
      cityId,
      countryId,
      teamId,
      ownerId,
      avatar,
      coverPhoto,
      privacy,
    }: FanClubCreationAttributes,
    transaction?: Transaction
  ) {
    const fanClub = await db.FanClub.create(
      {
        shortName,
        name,
        description,
        cityId,
        countryId,
        teamId,
        ownerId,
        avatar,
        coverPhoto,
        privacy,
      },
      { transaction }
    );

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
      shortName,
      name,
      description,
      cityId,
      countryId,
      avatar,
      coverPhoto,
      privacy,
    }: Partial<Omit<FanClubCreationAttributes, 'teamId'>>,
    transaction?: Transaction
  ) {
    const fanClub = await db.FanClub.findOne({
      where: {
        id: id,
      },
    });

    if (shortName) {
      fanClub.setDataValue('shortName', shortName);
    }
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

    await fanClub.save({ transaction });
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
        [db.Sequelize.Op.iLike]: `${params.name}%`,
      });
    }

    if (params.countryId) {
      this.queryArrayOrSingle(query, 'countryId', params.countryId);
    }

    if (params.cityId) {
      this.queryArrayOrSingle(query, 'cityId', params.cityId);
    }

    if (params.teamId) {
      this.queryArrayOrSingle(query, 'teamId', params.teamId);
    }

    // set alphabetical ordering
    if (!params.orderAttr) {
      params.orderAttr = 'name';
      params.order = OrderEnum.asc;
    }

    let moreQueryOptions = {};
    if (!params.userId) {
      // show only public fan clubs if user is not logged in
      this.queryAppend(query, 'privacy', FanClubPrivacyEnum.public);
    } else {
      const relationNameMember = resources.USER.ALIAS.PLURAL;
      const relationNameFanClubMember = resources.FAN_CLUB_MEMBER.RELATION;

      // show public fan clubs and private fan clubs that user in
      moreQueryOptions = {
        subQuery: false,
        include: [
          {
            required: false,
            model: db.User,
            as: resources.USER.ALIAS.PLURAL,
            through: {
              attributes: [],
            },
            attributes: [],
            where: {
              id: params.userId,
            },
          },
        ],
        where: {
          [db.Sequelize.Op.or]: [
            { privacy: FanClubPrivacyEnum.public },
            {
              [db.Sequelize.Op.and]: [
                { privacy: FanClubPrivacyEnum.private },

                db.Sequelize.literal(`
                  "${relationNameMember}->${relationNameFanClubMember}"."id" IS NOT NULL
                `),
              ],
            },
          ],
        },
      };
    }

    return this.findAndCountAll(db.FanClub, query, params, true, moreQueryOptions);
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
   * Update fan club's members count.
   *
   * If members status is a pending then it will not be included
   * in fan club as member.
   */
  static async updateMembersCount(id: ResourceIdentifier, transaction?: Transaction) {
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
    await fanClub.save({ transaction });
  }

  /**
   * Get fan clubs by member ID.
   */
  static async getUserFanClubs(userId: ResourceIdentifier) {
    const fanClubs = await db.FanClub.findAll({
      include: [
        {
          required: true,
          model: db.User,
          as: resources.USER.ALIAS.PLURAL,
          through: {
            attributes: [],
          },
          attributes: [],
          where: {
            id: userId,
          },
        },
      ],
    });

    return fanClubs;
  }
}

export default FanClubService;
