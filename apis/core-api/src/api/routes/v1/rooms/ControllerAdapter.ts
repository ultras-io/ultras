import RoomController from 'core/controllers/RoomController';

import { Context } from 'types';

class ControllerAdapter {
  static async create(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const { fanClubId, title, content, privacy } = ctx.request.body;

    const { userId } = ctx.user;

    /** CONTROLLERS */
    const { data } = await RoomController.create({
      authorId: userId,
      fanClubId,
      title,
      content,
      privacy,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.created(response);
  }
}

export default ControllerAdapter;
