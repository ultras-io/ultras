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
}

export default ControllerAdapter;
