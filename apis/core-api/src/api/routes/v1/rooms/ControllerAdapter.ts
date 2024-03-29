import RoomController from 'core/controllers/RoomController';

import { Context } from 'types';

class ControllerAdapter {
  static async create(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const { fanClubId, title, content, dateTime, privacy } = ctx.request.body;

    const { userId } = ctx.user;

    /** CONTROLLERS */
    const { data } = await RoomController.create({
      authorId: userId,
      fanClubId,
      title,
      content,
      dateTime: new Date(dateTime),
      privacy,
    });

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

    const userId = ctx.user ? ctx.user.userId : null;

    /** CONTROLLERS */
    const { data } = await RoomController.getById({ id, userId });

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

    const userId = ctx.user ? ctx.user.userId : null;

    /** CONTROLLERS */
    const { data, limit, offset, count } = await RoomController.getAll({
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

  static async update(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const { title, content, dateTime, privacy } = ctx.request.body;

    const { id } = ctx.request.params;

    /** CONTROLLERS */
    const { data } = await RoomController.update({
      id,
      title,
      content,
      dateTime: new Date(dateTime),
      privacy,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.ok(response);
  }

  static async delete(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const { id } = ctx.request.params;

    const { userId } = ctx.user;

    /** CONTROLLERS */
    await RoomController.delete({
      id,
      authorId: userId,
    });

    return ctx.noContent();
  }
}

export default ControllerAdapter;
