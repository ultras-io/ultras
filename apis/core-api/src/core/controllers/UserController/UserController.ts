import { NotifiedProviderEnum, UserErrorEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import {
  AuthenticationError,
  BadRequest,
  ResourceDuplicationError,
} from 'modules/exceptions';
import {
  AuthService,
  UserService,
  VerificationCodeService,
  FavoriteTeamService,
  SMSService,
  MailerService,
} from 'services';
import { Context } from 'types';

import {
  UserCheckUsernameParams,
  UserCheckUsernameResult,
  UserConfirmIdentityParams,
  UserConfirmIdentityResult,
  UserVerifyCodeParams,
  UserVerifyCodeResult,
  UserRegistrationParams,
  UserRegistrationResult,
  UserLoginParams,
  UserLoginResult,
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
    const verificationCode = await VerificationCodeService.getVerificationCode({
      phone,
      email,
      code,
    });

    if (verificationCode == null) {
      throw new BadRequest({
        reason: UserErrorEnum.invalidVerificationCode,
      });
    }

    const isUsernameTaken = await UserService.isUsernameTaken(username);
    if (isUsernameTaken) {
      throw new ResourceDuplicationError({
        reason: UserErrorEnum.usernameTaken,
      });
    }

    if (email) {
      const isEmailTaken = await UserService.isEmailTaken(email);
      if (isEmailTaken) {
        throw new ResourceDuplicationError({
          reason: UserErrorEnum.emailTaken,
        });
      }
    } else if (phone) {
      const isPhoneTaken = await UserService.isPhoneTaken(phone);
      if (isPhoneTaken) {
        throw new ResourceDuplicationError({
          reason: UserErrorEnum.phoneTaken,
        });
      }
    }

    const user = await UserService.create({
      email,
      phone,
      avatar,
      username,
      fullname,
    });

    if (null == user) {
      this.riseSomethingWrong(null, UserErrorEnum.unknown);
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

  static async loginUser(
    ctx: Context,
    { code, email, phone }: UserLoginParams
  ): UserLoginResult {
    const verificationCode = await VerificationCodeService.getVerificationCode({
      phone,
      email,
      code,
    });

    if (verificationCode == null) {
      throw new BadRequest({
        reason: UserErrorEnum.invalidVerificationCode,
      });
    }

    if (email) {
      const isEmailAvailable = await UserService.isEmailAvailable(email);
      if (isEmailAvailable) {
        throw new AuthenticationError({
          reason: UserErrorEnum.incorrectEmail,
        });
      }
    } else if (phone) {
      const isPhoneAvailable = await UserService.isPhoneAvailable(phone);
      if (isPhoneAvailable) {
        throw new AuthenticationError({
          reason: UserErrorEnum.incorrectPhone,
        });
      }
    }

    const user = await UserService.findByUniqueIdentifier({
      email,
      phone,
    });

    if (null == user) {
      throw this.riseSomethingWrong(null, UserErrorEnum.unknown);
    }

    const accessToken = await AuthService.generateAccessToken(user, {
      ua: ctx.headers['user-agent'],
    });

    return {
      data: {
        success: true,
        accessToken: accessToken,
        user: user,
      },
    };
  }
}

export default UserController;
