import FavoriteTeamController from 'core/controllers/FavoriteTeamController';

import { Context } from 'types';

class ControllerAdapter {
  /**
   * Get favorite teams.
   */
  static async getAll(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const params = ctx.request.query;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    const { data, limit, offset, count } = await FavoriteTeamController.getAll({
      ...params,
      userId: userId,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
      limit,
      offset,
      total: count,
    };

    return ctx.ok(response);
  }

  /**
   * Get favorite team by id.
   */
  static async getById(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const { id } = ctx.request.params;

    /** CONTROLLERS */
    const { data } = await FavoriteTeamController.getById(id);

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.ok(response);
  }

  /**
   * Add team(s) to favorite list.
   */
  static async add(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const { teamId } = ctx.request.body;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    const { data } = await FavoriteTeamController.add({
      userId: userId,
      teamId: teamId,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.created(response);
  }

  /**
   * Remove team from favorites.
   */
  static async remove(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const { id } = ctx.request.params;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    await FavoriteTeamController.remove({
      favoriteTeamId: id,
      userId: userId,
    });

    return ctx.noContent();
  }

  /**
   * Remove team from favorites.
   */
  static async removeByTeamId(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const { id } = ctx.request.params;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    await FavoriteTeamController.remove({
      teamId: id,
      userId: userId,
    });

    return ctx.noContent();
  }
}

export default ControllerAdapter;
