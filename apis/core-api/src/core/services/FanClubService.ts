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

import BaseService, { RelationGroupType } from './BaseService';
import CityService from './CityService';
import CountryService from './CountryService';
import TeamService from './TeamService';

export interface IFanClubListParams {
  userId?: ResourceIdentifier | null;
  name?: string;
  countryId?: ResourceIdentifier;
  cityId?: ResourceIdentifier;
  teamId?: ResourceIdentifier;
  ownerId?: ResourceIdentifier;
}

export interface IFanClubMembershipListParams {
  name: string;
  fanClubId: ResourceIdentifier;
}

export const defaultRelations: RelationGroupType = ['city', 'country', 'team', 'owner'];

class FanClubService extends BaseService {
  protected static includeRelations(relations: RelationGroupType = defaultRelations) {
    const includeRelations = [];

    if (this.isRelationIncluded(relations, 'city')) {
      const relationsHierarchy = this.getRelationsHierarchy(relations, {
        city: ['country'],
      });

      includeRelations.push({
        model: db.City,
        as: resources.CITY.ALIAS.SINGULAR,
        ...CityService.getIncludeRelations(relationsHierarchy),
      });
    }

    if (this.isRelationIncluded(relations, 'country')) {
      includeRelations.push({
        model: db.Country,
        as: resources.COUNTRY.ALIAS.SINGULAR,
        ...CountryService.getIncludeRelations(),
      });
    }

    if (this.isRelationIncluded(relations, 'team')) {
      const relationsHierarchy = this.getRelationsHierarchy(relations, {
        team: ['city', 'country', 'venue'],
      });

      includeRelations.push({
        model: db.Team,
        as: resources.TEAM.ALIAS.SINGULAR,
        ...TeamService.getIncludeRelations(relationsHierarchy),
      });
    }

    if (this.isRelationIncluded(relations, 'owner')) {
      includeRelations.push({
        model: db.User,
        as: 'owner',
      });
    }

    return {
      include: includeRelations,
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
    params: ServiceListParamsType<IFanClubListParams>
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

    let moreQueryOptions: any = {};
    if (!params.userId) {
      // show only public fan clubs if user is not logged in
      this.queryAppend(query, 'privacy', FanClubPrivacyEnum.public);
    } else {
      const relationNameMember = resources.USER.ALIAS.PLURAL;
      const relationNameFanClubMember = resources.FAN_CLUB_MEMBER.RELATION;

      // show public fan clubs and private fan clubs that user in
      moreQueryOptions = {
        attributes: {
          include: [
            [
              db.Sequelize.literal(`
                (
                  SELECT
                    CASE
                      WHEN "status" IS NULL THEN '${FanClubMemberStatusEnum.notRelated}'
                      ELSE "status"
                    END AS "joinStatus"
                  FROM "${resources.ULTRAS_CORE}"."${resources.FAN_CLUB_MEMBER.RELATION}"
                  WHERE (
                    "deletedAt" IS NULL AND
                    "memberId" = ${params.userId} AND
                    "fanClubId" = "${resources.FAN_CLUB.RELATION}"."id"
                  )
                )
              `),
              'joinStatus',
            ],
          ],
        },
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
      };

      if (!params.name) {
        moreQueryOptions.where = {
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
        };
      }
    }

    return this.findAndCountAll(db.FanClub, query, params, true, moreQueryOptions);
  }

  /**
   * Get fan club by their ID.
   */
  static async getById(
    id: ResourceIdentifier,
    userId?: ResourceIdentifier | undefined
  ): ServiceByIdResultType<FanClubAttributes> {
    const options: any = {};
    if (userId) {
      options.attributes = {
        include: [
          [
            db.Sequelize.literal(`
              (
                SELECT
                  CASE
                    WHEN "status" IS NULL THEN '${FanClubMemberStatusEnum.notRelated}'
                    ELSE "status"
                  END AS "joinStatus"
                FROM "${resources.ULTRAS_CORE}"."${resources.FAN_CLUB_MEMBER.RELATION}"
                WHERE (
                  "deletedAt" IS NULL AND
                  "memberId" = ${userId} AND
                  "fanClubId" = "${resources.FAN_CLUB.RELATION}"."id"
                )
              )
            `),
            'joinStatus',
          ],
        ],
      };
    }

    return this.findById(db.FanClub, id, options);
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
