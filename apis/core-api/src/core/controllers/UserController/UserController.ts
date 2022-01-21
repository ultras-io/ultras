import { NotifiedProviderEnum } from '@ultras/utils';
import BaseController from 'abstraction/BaseController';
import {
  UserService,
  VerificationCodeService,
  SMSService,
  MailerService,
} from 'services';

import {
  UserCheckUsernameParams,
  UserCheckUsernameResult,
  UserConfirmIdentityParams,
  UserConfirmIdentityResult,
  UserVerifyCodeParams,
  UserVerifyCodeResult,
  UserRegistrationParams,
  UserRegistrationResult,
} from './types';

class UserController extends BaseController {
  static async checkUsernameExists({
    username,
  }: UserCheckUsernameParams): UserCheckUsernameResult {
    const isTaken = await UserService.isUsernameTaken(username);

    return {
      data: {
        available: !isTaken,
      },
    };
  }

  static async confirmUserIdentity({
    phone,
    email,
  }: UserConfirmIdentityParams): UserConfirmIdentityResult {
    // @TODO: rate limit
    const code = await VerificationCodeService.generate();
    let provider: null | NotifiedProviderEnum = null;

    if (email) {
      provider = NotifiedProviderEnum.email;
      await MailerService.sendVerificationCode({
        code,
        email,
      });
    } else if (phone) {
      provider = NotifiedProviderEnum.sms;
      await SMSService.sendVerificationCode({
        code,
        phone,
      });
    }

    if (null != provider) {
      await VerificationCodeService.store({
        code,
        provider,
        phone,
        email,
      });
    }

    return {
      data: {
        success: null != provider,
        provider: provider,
      },
    };
  }

  static async verifyCode({
    phone,
    email,
    code,
  }: UserVerifyCodeParams): UserVerifyCodeResult {
    return {
      data: {
        success: false,
      },
    };
  }

  static async registerUser({
    code,
    email,
    phone,
    username,
    fullname,
    teamId,
  }: UserRegistrationParams): UserRegistrationResult {
    return {
      data: {
        success: true,
      },
    };
  }
}

export default UserController;
