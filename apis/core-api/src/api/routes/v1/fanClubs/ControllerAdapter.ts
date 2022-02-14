import FanClubController from 'core/controllers/FanClubController';

import { Context } from 'types';

class ControllerAdapter {
  static async create(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { name, description, cityId, teamId, avatar, coverPhoto, privacy } =
      ctx.request.body;

    const { userId } = ctx.user;

    /** CONTROLLERS */
    const { data } = await FanClubController.create({
      creatorId: userId,
      name,
      description,
      cityId,
      teamId,
      avatar,
      coverPhoto,
      privacy,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.created(response);
  }

  static async update(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { name, description, cityId, avatar, coverPhoto, privacy } = ctx.request.body;

    /** CONTROLLERS */
    const { id } = ctx.request.params;
    const { data } = await FanClubController.update({
      id,
      name,
      description,
      cityId,
      avatar,
      coverPhoto,
      privacy,
    });

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
    const { data, limit, offset, count } = await FanClubController.getAll(params);

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

  static async getById(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { id } = ctx.request.params;

    /** CONTROLLERS */
    const { data } = await FanClubController.getById(id);

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.created(response);
  }
}

export default ControllerAdapter;
