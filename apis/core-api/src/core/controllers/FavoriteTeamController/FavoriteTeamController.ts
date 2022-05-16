import { OrderEnum } from '@ultras/utils';
import { ResourceIdentifier } from 'types';
import BaseController from 'core/controllers/BaseController';
import { FavoriteTeamService } from 'core/services';
import { ResourceNotFoundError } from 'modules/exceptions';
import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';

import {
  AddFavoriteTeamBulkParamsType,
  AddFavoriteTeamBulkResultType,
  FavoriteTeamByIdResult,
  FavoriteTeamListParamsType,
  FavoriteTeamListResultType,
  RemoveFavoriteTeamParamsType,
} from './types';

class FavoriteTeamController extends BaseController {
  /**
   * Get all favorite teams.
   */
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = '',
    order = OrderEnum.asc,
    search = '',
    userId,
  }: FavoriteTeamListParamsType): FavoriteTeamListResultType {
    const { rows, count } = await FavoriteTeamService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      search,
      userId,
    });

    return {
      data: rows,
      count,
      limit,
      offset,
    };
  }

  /**
   * Get favorite team by pivot relation id.
   */
  static async getById(id: ResourceIdentifier): FavoriteTeamByIdResult {
    const favoriteTeam = await FavoriteTeamService.getByIdentifier({
      favoriteTeamId: id,
    });

    if (!favoriteTeam) {
      throw new ResourceNotFoundError({
        message: "User's favorite team not found.",
      });
    }

    return {
      data: favoriteTeam,
    };
  }

  /**
   * Add new team(s) to user's favorite list.
   */
  static async add(params: AddFavoriteTeamBulkParamsType): AddFavoriteTeamBulkResultType {
    let isBulkAction = true;
    if (!Array.isArray(params.teamId)) {
      isBulkAction = false;
      params.teamId = [params.teamId];
    }

    const favoriteTeams = await FavoriteTeamService.add({
      userId: params.userId,
      teamId: params.teamId,
    });

    return {
      data: isBulkAction ? favoriteTeams : favoriteTeams[0],
    };
  }

  /**
   * Remove team from user's favorite list.
   */
  static async remove(params: RemoveFavoriteTeamParamsType): Promise<void> {
    await FavoriteTeamService.remove({
      userId: params.userId,
      favoriteTeamId: params.favoriteTeamId,
      teamId: params.teamId,
    });
  }
}

export default FavoriteTeamController;
