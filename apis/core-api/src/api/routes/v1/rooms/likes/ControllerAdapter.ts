import RoomLikeController from 'core/controllers/RoomLikeController';

import { Context } from 'types';

class ControllerAdapter {
  static async create(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const roomId = ctx.request.params.id;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    await RoomLikeController.create({
      userId,
      roomId,
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
    const roomId = ctx.request.params.id;

    /** CONTROLLERS */
    const { data, limit, offset, count } = await RoomLikeController.getAll({
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

  static async delete(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const roomId = ctx.request.params.id;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    await RoomLikeController.delete({
      userId,
      roomId,
    });

    return ctx.noContent();
  }
}

export default ControllerAdapter;
