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
      errorCode: UserErrorEnum.requiredEmailOrPhone,
      message: 'Please provide a email address or phone number',
    });
  }
};

const getAuthHeader = (ctx: Context): string => {
  return (ctx.headers['authorization'] || '').replace('Bearer ', '');
};

class ControllerAdapter {
  static async checkUsernameExistence(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { username } = ctx.request.query;

    /** CONTROLLERS */
    const { data } = await UserController.checkUsernameExistence({
      username,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.ok(response);
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

  static async register(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { code, phone, email, username, fullname, teamId } = ctx.request.body;
    handlePhoneOrEmail({ phone, email });

    /** CONTROLLERS */
    const { data, token } = await UserController.register({
      fingerprint: ctx.device.fingerprint,
      ip: ctx.ip,
      device: ctx.device.type,
      osName: ctx.device.os.name,
      osVersion: ctx.device.os.version,
      browser: ctx.device.browser,
      userAgent: ctx.headers['user-agent'],
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
      token,
    };

    return ctx.ok(response);
  }

  static async login(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { code, phone, email } = ctx.request.body;
    handlePhoneOrEmail({ phone, email });

    /** CONTROLLERS */
    const { data, token } = await UserController.login({
      fingerprint: ctx.device.fingerprint,
      ip: ctx.ip,
      device: ctx.device.type,
      osName: ctx.device.os.name,
      osVersion: ctx.device.os.version,
      browser: ctx.device.browser,
      userAgent: ctx.headers['user-agent'],
      code,
      phone,
      email,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
      token,
    };

    return ctx.ok(response);
  }

  static async revokeToken(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const authToken = getAuthHeader(ctx);

    /** CONTROLLERS */
    await UserController.revokeToken({
      token: authToken,
    });

    /** RESPONSE */
    return ctx.noContent();
  }

  static async getMe(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const authToken = getAuthHeader(ctx);

    /** CONTROLLERS */
    const { data } = await UserController.getMe({
      token: authToken,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.ok(response);
  }

  static async getProfile(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { id } = ctx.request.params;

    /** CONTROLLERS */
    const { data } = await UserController.getProfile({
      userId: id,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.ok(response);
  }

  static async updateProfile(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { userId } = ctx.user;
    const { code, phone, email, fullname, avatar } = ctx.request.body;

    /** CONTROLLERS */
    const { data } = await UserController.updateProfile({
      userId,
      code,
      phone,
      email,
      fullname,
      avatar,
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
