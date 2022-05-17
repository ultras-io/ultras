import MatchController from 'core/controllers/MatchController';

import { Context } from 'types';

class ControllerAdapter {
  /**
   * Inject matches from Rapid API.
   * @TODO: move it into seeder.
   */
  static async inject(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { date } = ctx.request.params;

    /** CONTROLLERS */
    const { data } = await MatchController.inject(date);

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

    /** CONTROLLERS */
    const { data } = await MatchController.getById(id);

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

    /** CONTROLLERS */
    const { data, limit, offset, count } = await MatchController.getAll(params);

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
