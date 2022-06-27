import RoomMemberController from 'core/controllers/RoomMemberController';

import { Context } from 'types';

class ControllerAdapter {
  static async create(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const roomId = ctx.request.params.id;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    const { data } = await RoomMemberController.create({
      roomId,
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
    const roomId = ctx.request.params.id;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    await RoomMemberController.delete({
      roomId,
      userId,
    });

    return ctx.noContent();
  }

  static async getAll(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const roomId = ctx.request.params.id;
    const {
      search,
      limit: queryLimit,
      offset: queryOffset,
      orderAttr,
      order,
    } = ctx.request.query;

    /** CONTROLLERS */
    const { data, limit, offset, count } = await RoomMemberController.getAll({
      limit: queryLimit,
      offset: queryOffset,
      orderAttr,
      order,
      search,
      roomId,
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
