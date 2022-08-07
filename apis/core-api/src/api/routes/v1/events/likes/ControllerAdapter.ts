import EventLikeController from 'core/controllers/EventLikeController';

import { Context } from 'types';

class ControllerAdapter {
  static async create(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const eventId = ctx.request.params.id;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    await EventLikeController.create({
      userId,
      eventId,
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
    const eventId = ctx.request.params.id;

    /** CONTROLLERS */
    const { data, limit, offset, count } = await EventLikeController.getAll({
      eventId,
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
    const eventId = ctx.request.params.id;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    await EventLikeController.delete({
      userId,
      eventId,
    });

    return ctx.noContent();
  }
}

export default ControllerAdapter;
