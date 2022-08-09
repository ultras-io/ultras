import MatchCommentController from 'core/controllers/MatchCommentController';

import { Context } from 'types';

class ControllerAdapter {
  static async create(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const { id: matchId } = ctx.request.params;
    const { content } = ctx.request.body;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    const comment = await MatchCommentController.create({
      userId,
      matchId,
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
    const { id: matchId, commentId } = ctx.request.params;
    const { content } = ctx.request.body;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    const comment = await MatchCommentController.update({
      userId,
      commentId,
      matchId,
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
    const matchId = ctx.request.params.id;

    /** CONTROLLERS */
    const { data, limit, offset, count } = await MatchCommentController.getAll({
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
    const { id: matchId, commentId } = ctx.request.params;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    await MatchCommentController.delete({
      userId,
      commentId,
      matchId,
    });

    return ctx.noContent();
  }
}

export default ControllerAdapter;
