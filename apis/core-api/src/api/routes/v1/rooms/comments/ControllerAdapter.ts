import RoomCommentController from 'core/controllers/RoomCommentController';

import { Context } from 'types';

class ControllerAdapter {
  static async create(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const { id: roomId } = ctx.request.params;
    const { content } = ctx.request.body;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    const comment = await RoomCommentController.create({
      userId,
      roomId,
      content,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data: comment,
    };

    return ctx.created(response);
  }

  static async update(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const { id: roomId, commentId } = ctx.request.params;
    const { content } = ctx.request.body;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    const comment = await RoomCommentController.update({
      userId,
      commentId,
      roomId,
      content,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data: comment,
    };

    return ctx.ok(response);
  }

  static async getAll(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const roomId = ctx.request.params.id;

    /** CONTROLLERS */
    const { data, limit, offset, count } = await RoomCommentController.getAll({
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
    const { id: roomId, commentId } = ctx.request.params;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    await RoomCommentController.delete({
      userId,
      commentId,
      roomId,
    });

    return ctx.noContent();
  }
}

export default ControllerAdapter;
