import UserController from 'core/controllers/UserController';

import { Context } from 'types';

class ControllerAdapter {
  static async checkUsernameExists(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { username } = ctx.request.query;

    /** CONTROLLERS */
    const { data } = await UserController.checkUsernameExists({
      username,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.created(response);
  }

  static async confirmUserIdentity(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { phone, email } = ctx.request.body;

    /** CONTROLLERS */
    const { data } = await UserController.confirmUserIdentity({
      phone,
      email,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.ok(response);
  }

  static async verifyCode(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { phone, email, code } = ctx.request.body;

    /** CONTROLLERS */
    const { data } = await UserController.verifyCode({
      phone,
      email,
      code,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.ok(response);
  }

  static async registerUser(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { code, phone, email, username, fullname, teamId } = ctx.request.body;

    /** CONTROLLERS */
    const { data } = await UserController.registerUser({
      code,
      phone,
      email,
      username,
      fullname,
      teamId,
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
