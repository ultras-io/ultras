import { UserErrorEnum } from '@ultras/utils';
import UserController from 'core/controllers/UserController';
import { InvalidUserInput } from 'modules/exceptions';

import { Context } from 'types';

interface PhoneOrEmail {
  phone?: string;
  email?: string;
}

const handlePhoneOrEmail = ({ email, phone }: PhoneOrEmail) => {
  if (!phone && !email) {
    throw new InvalidUserInput({
      reason: UserErrorEnum.requiredEmailOrPhone,
    });
  }
};

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
    handlePhoneOrEmail({ phone, email });

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
    handlePhoneOrEmail({ phone, email });

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
    handlePhoneOrEmail({ phone, email });

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

  static async loginUser(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { code, phone, email } = ctx.request.body;
    handlePhoneOrEmail({ phone, email });

    /** CONTROLLERS */
    const { data } = await UserController.loginUser(ctx, {
      code,
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
}

export default ControllerAdapter;
