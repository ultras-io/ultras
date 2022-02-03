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

  static async getTokenInfo(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const authToken = (ctx.headers['authorization'] || '').replace('Bearer ', '');

    /** CONTROLLERS */
    const { data } = await UserController.getTokenInfo({
      token: authToken,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.ok(response);
  }

  static async revokeToken(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const authToken = (ctx.headers['authorization'] || '').replace('Bearer ', '');

    /** CONTROLLERS */
    const { data } = await UserController.revokeToken({
      token: authToken,
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
