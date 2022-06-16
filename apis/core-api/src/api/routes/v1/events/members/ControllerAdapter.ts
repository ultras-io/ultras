import EventMemberController from 'core/controllers/EventMemberController';

import { Context } from 'types';

class ControllerAdapter {
  static async create(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const eventId = ctx.request.params.id;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    const { data } = await EventMemberController.create({
      eventId,
      userId,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.created(response);
  }

  static async delete(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const eventId = ctx.request.params.id;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    await EventMemberController.delete({
      eventId,
      userId,
    });

    return ctx.noContent();
  }

  static async getAll(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const eventId = ctx.request.params.id;
    const {
      search,
      limit: queryLimit,
      offset: queryOffset,
      orderAttr,
      order,
    } = ctx.request.query;

    /** CONTROLLERS */
    const { data, limit, offset, count } = await EventMemberController.getAll({
      limit: queryLimit,
      offset: queryOffset,
      orderAttr,
      order,
      search,
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
}

export default ControllerAdapter;
