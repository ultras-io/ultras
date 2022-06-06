import EventController from 'core/controllers/EventController';

import { Context } from 'types';

class ControllerAdapter {
  static async create(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const {
      matchId,
      fanClubId,
      title,
      content,
      privacy,
      dateTime,
      locationName,
      locationLat,
      locationLng,
    } = ctx.request.body;

    const { userId } = ctx.user;

    /** CONTROLLERS */
    const { data } = await EventController.create({
      authorId: userId,
      matchId,
      fanClubId,
      title,
      content,
      privacy,
      dateTime: new Date(dateTime),
      locationName,
      locationLat,
      locationLng,
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

    /** CONTROLLERS */
    const { data } = await EventController.getById(id);

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
    const { data, limit, offset, count } = await EventController.getAll(params);

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
