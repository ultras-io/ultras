import EventCommentController from 'core/controllers/EventCommentController';

import { Context } from 'types';

class ControllerAdapter {
  static async create(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const { id: eventId } = ctx.request.params;
    const { content } = ctx.request.body;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    const comment = await EventCommentController.create({
      userId,
      eventId,
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
    const { id: eventId, commentId } = ctx.request.params;
    const { content } = ctx.request.body;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    const comment = await EventCommentController.update({
      userId,
      commentId,
      eventId,
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
    const eventId = ctx.request.params.id;

    /** CONTROLLERS */
    const { data, limit, offset, count } = await EventCommentController.getAll({
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
    const { id: eventId, commentId } = ctx.request.params;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    await EventCommentController.delete({
      userId,
      commentId,
      eventId,
    });

    return ctx.noContent();
  }
}

export default ControllerAdapter;
