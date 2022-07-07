import { Transaction } from 'sequelize';
import {
  ResourceIdentifier,
  ServiceByIdResultType,
  ServiceListParamsType,
  ServiceListResultType,
  ServiceResultType,
} from 'types';
import resources from 'core/data/lcp';
import db from 'core/data/models';
import {
  FavoriteTeam,
  FavoriteTeamCreationAttributes,
} from 'core/data/models/FavoriteTeam';

import BaseService from './BaseService';
import {
  FavoriteTeamsViewModel,
  FavoriteTeamViewModel,
  TeamsViewModel,
} from '@ultras/view-models';
import TeamService from './TeamService';

export interface FavoriteTeamByUserListParamsInterface {
  userId?: ResourceIdentifier;
  search?: string;
}

export interface FavoriteTeamListParamsInterface {
  userId?: ResourceIdentifier;
  teamId?: ResourceIdentifier;
  search?: string;
}

export interface ActionByIdentifierInterface {
  userId?: ResourceIdentifier;
  favoriteTeamId?: ResourceIdentifier;
  teamId?: ResourceIdentifier;
}

export interface AddSingleParamsInterface {
  userId: ResourceIdentifier;
  teamId: ResourceIdentifier | Array<ResourceIdentifier>;
}

class FavoriteTeamService extends BaseService {
  protected static includeRelations() {
    return {
      attributes: {
        exclude: ['teamId', 'userId'],
      },
      include: [
        {
          model: db.Team,
          as: resources.TEAM.ALIAS.SINGULAR,
          ...TeamService.getIncludeRelations(),
        },
        {
          model: db.User,
          as: resources.USER.ALIAS.SINGULAR,
        },
      ],
    };
  }

  /**
   * Build query condition.
   */
  private static buildActionCondition(params: ActionByIdentifierInterface) {
    // if no any unique identifier provided then null returned
    // there is no way to determine favorite team.
    if (Object.keys(params).length == 0) {
      return null;
    }

    // if only userId provided then null returned
    // it's not enough to determine favorite team.
    if (params.userId && !params.teamId && !params.favoriteTeamId) {
      return null;
    }

    // building empty query
    const queryOptions: any = {};

    // append conditions
    if (params.favoriteTeamId) {
      queryOptions.id = params.favoriteTeamId;
    }
    if (params.userId) {
      queryOptions.userId = params.userId;
    }
    if (params.teamId) {
      queryOptions.teamId = params.teamId;
    }

    return queryOptions;
  }

  /**
   * Add user new favorite team.
   */
  static async add(
    { userId, teamId }: AddSingleParamsInterface,
    transaction?: Transaction
  ): Promise<FavoriteTeamsViewModel> {
    if (!Array.isArray(teamId)) {
      teamId = [teamId];
    }

    const data: Array<FavoriteTeamCreationAttributes> = teamId.map(
      (teamIdItem: ResourceIdentifier) => ({
        userId,
        teamId: teamIdItem,
        deletedAt: null,
      })
    );

    const favoriteTeams = await db.FavoriteTeam.bulkCreate(data, {
      transaction,
      // ignoreDuplicates: true,
      updateOnDuplicate: ['deletedAt'],
    });

    return favoriteTeams;
  }

  /**
   * Get all favorite teams by user id.
   */
  static async getAllTeams(
    params: ServiceListParamsType<FavoriteTeamByUserListParamsInterface>
  ): ServiceListResultType<TeamsViewModel> {
    // generate subquery
    const subquerySel = db.sequelize.dialect.queryGenerator
      .selectQuery(db.FavoriteTeam.getTableName(), {
        attributes: ['teamId'],
        where: {
          userId: params.userId,
        },
      })
      .slice(0, -1);

    // check if search parameter was provided, then we need to
    // search using team fields too.
    let searchCondition = {};
    if (params.search) {
      searchCondition = ['name'].reduce(
        (acc, field) => ({
          ...acc,
          [field]: {
            [db.Sequelize.Op.iLike]: `%${params.search}%`,
          },
        }),
        {}
      );
    }

    // build generic query options
    const queryOptions: any = {
      limit: params.limit,
      offset: params.offset,
      where: {
        ...searchCondition,
        id: {
          [db.Sequelize.Op.in]: db.Sequelize.literal(`
            (${subquerySel})
          `),
        },
      },
    };

    const { rows, count } = await db.Team.findAndCountAll(queryOptions);
    return { rows, count };
  }

  /**
   * Get all favorite teams by user id.
   */
  static async getAll(
    params: ServiceListParamsType<FavoriteTeamListParamsInterface>
  ): ServiceListResultType<FavoriteTeamsViewModel> {
    // teamId or userId must be provided
    if (!params.userId && !params.teamId) {
      return { rows: [], count: 0 };
    }

    // build generic query options
    const queryOptions: any = {
      limit: params.limit,
      offset: params.offset,
      where: {},
      ...this.includeRelations(),
    };

    if (params.userId) {
      queryOptions.where.userId = params.userId;
      queryOptions.order = [
        [resources.TEAM.ALIAS.SINGULAR, params.orderAttr || 'name', params.order],
      ];

      // if user id and search query provided then we need to
      // search in team fields
      if (params.search) {
        // remove team relation
        queryOptions.include = queryOptions.include.filter(
          (include: any) => include.as != resources.TEAM.ALIAS.SINGULAR
        );

        const searchCondition = ['name'].map(field => ({
          [field]: {
            [db.Sequelize.Op.iLike]: `%${params.search}%`,
          },
        }));

        // add fan club relation with search conditions
        queryOptions.include.push({
          model: db.Team,
          as: resources.TEAM.ALIAS.SINGULAR,
          required: true,
          where: searchCondition,
        });
      }
    } else if (params.teamId) {
      queryOptions.where.teamId = params.teamId;
      queryOptions.order = [
        [resources.USER.ALIAS.SINGULAR, params.orderAttr || 'fullname', params.order],
      ];

      // if team id and search query provided then we need to
      // search in user fields
      if (params.search) {
        // remove user relation
        queryOptions.include = queryOptions.include.filter(
          (include: any) => include.as != resources.USER.ALIAS.SINGULAR
        );

        const searchCondition = ['fullname'].map(field => ({
          [field]: {
            [db.Sequelize.Op.iLike]: `%${params.search}%`,
          },
        }));

        // add member relation with search conditions
        queryOptions.include.push({
          model: db.User,
          as: resources.USER.ALIAS.SINGULAR,
          required: true,
          where: {
            [db.Sequelize.Op.or]: searchCondition,
          },
        });
      }
    }

    const { rows, count } = await db.FavoriteTeam.findAndCountAll(queryOptions);
    return { rows, count };
  }

  /**
   * Get favorite team by pivot table id.
   */
  static async getByIdentifier(
    params: ActionByIdentifierInterface
  ): ServiceByIdResultType<FavoriteTeamViewModel> {
    const condition = this.buildActionCondition(params);
    if (!condition) {
      return null;
    }

    const favoriteTeam = await db.FavoriteTeam.findOne({
      where: condition,
      ...this.includeRelations(),
    });

    return favoriteTeam;
  }

  /**
   * Remove user new favorite team.
   */
  static async remove(
    params: ActionByIdentifierInterface,
    transaction?: Transaction
  ): Promise<void> {
    const condition = this.buildActionCondition(params);
    if (!condition) {
      return;
    }

    await db.FavoriteTeam.destroy(
      {
        where: condition,
        force: true,
      },
      { transaction }
    );
  }

  /**
   * Get favorite teams id list by user.
   */
  static async getTeamsIdList(
    userId: ResourceIdentifier
  ): Promise<Array<ResourceIdentifier>> {
    const favoriteTeams = await db.FavoriteTeam.findAll({
      where: {
        userId: userId,
      },
      attributes: {
        include: ['teamId'],
      },
    });

    const idList: Array<ResourceIdentifier> = favoriteTeams.map(
      (favoriteTeam: FavoriteTeam) => favoriteTeam.getDataValue('teamId')
    );

    return idList;
  }
}

export default FavoriteTeamService;
