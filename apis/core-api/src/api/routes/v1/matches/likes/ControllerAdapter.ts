import MatchLikeController from 'core/controllers/MatchLikeController';

import { Context } from 'types';

class ControllerAdapter {
  static async create(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const matchId = ctx.request.params.id;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    await MatchLikeController.create({
      userId,
      matchId,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data: null,
    };

    return ctx.created(response);
  }

  static async getAll(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const matchId = ctx.request.params.id;

    /** CONTROLLERS */
    const { data, limit, offset, count } = await MatchLikeController.getAll({
      matchId,
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

  static async delete(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const matchId = ctx.request.params.id;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    await MatchLikeController.delete({
      userId,
      matchId,
    });

    return ctx.noContent();
  }
}

export default ControllerAdapter;
