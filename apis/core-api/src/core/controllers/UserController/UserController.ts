import { NotifiedProviderEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import {
  UserService,
  VerificationCodeService,
  FavoriteTeamService,
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
    const code = await VerificationCodeService.generate();
    let provider: null | NotifiedProviderEnum = null;
    let userExists = false;

    if (email) {
      provider = NotifiedProviderEnum.email;
      await MailerService.sendVerificationCode({
        code,
        email,
      });

      userExists = await UserService.isEmailTaken(email);
    } else if (phone) {
      provider = NotifiedProviderEnum.sms;
      await SMSService.sendVerificationCode({
        code,
        phone,
      });

      userExists = await UserService.isPhoneTaken(phone);
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
        userExists: userExists,
      },
    };
  }

  static async verifyCode({
    phone,
    email,
    code,
  }: UserVerifyCodeParams): UserVerifyCodeResult {
    const verificationCode = await VerificationCodeService.getVerificationCode({
      phone,
      email,
      code,
    });

    return {
      data: {
        valid: null != verificationCode,
        details: verificationCode,
      },
    };
  }

  static async registerUser({
    code,
    email,
    phone,
    avatar,
    username,
    fullname,
    teamId,
  }: UserRegistrationParams): UserRegistrationResult {
    const respondWithError = (error: string) => {
      return {
        data: {
          error: error,
          success: false,
        },
      };
    };

    const verificationCode = await VerificationCodeService.getVerificationCode({
      phone,
      email,
      code,
    });

    if (verificationCode == null) {
      return respondWithError('verification_code_not_valid');
    }

    const isUsernameTaken = await UserService.isUsernameTaken(username);
    if (isUsernameTaken) {
      return respondWithError('username_already_taken');
    }

    const isEmailTaken = await UserService.isEmailTaken(username);
    if (isEmailTaken) {
      return respondWithError('email_already_taken');
    }

    const isPhoneTaken = await UserService.isPhoneTaken(username);
    if (isPhoneTaken) {
      return respondWithError('phone_already_taken');
    }

    const user = await UserService.create({
      email,
      phone,
      avatar,
      username,
      fullname,
    });

    if (null == user) {
      return respondWithError('unknown_error');
    }

    if (teamId) {
      const userId = user.getDataValue('id');
      await FavoriteTeamService.addToUserFavorites(userId, teamId);
    }

    await VerificationCodeService.removeVerificationCode({
      phone,
      email,
      code,
    });

    return {
      data: {
        success: true,
        user: user,
      },
    };
  }
}

export default UserController;
