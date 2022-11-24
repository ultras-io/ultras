import MatchController from 'core/controllers/MatchController';

import { Context } from 'types';

class ControllerAdapter {
  /**
   * Inject matches from Rapid API.
   * @TODO: move it into seeder.
   */
  static async injectByDate(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { date } = ctx.request.params;

    /** CONTROLLERS */
    const { data } = await MatchController.injectByDate(date);

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.created(response);
  }
  /**
   * Inject matches from Rapid API.
   * @TODO: move it into seeder.
   */
  static async injectBySeason(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { season } = ctx.request.params;

    /** CONTROLLERS */
    const { data } = await MatchController.injectBySeason(season);

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.created(response);
  }

  static async getById(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { id } = ctx.request.params;
    const userId = ctx.user?.userId;

    /** CONTROLLERS */
    const { data } = await MatchController.getById({ id, userId });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.ok(response);
  }

  static async getAll(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const params = ctx.request.query;
    const userId = ctx.user?.userId;

    /** CONTROLLERS */
    const { data, limit, offset, count } = await MatchController.getAll({
      ...params,
      userId,
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
}

export default ControllerAdapter;
