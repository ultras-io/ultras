import { NotifiedProviderEnum, UserErrorEnum } from '@ultras/utils';
import { Transaction } from 'sequelize';
import BaseController from 'core/controllers/BaseController';
import {
  AuthenticationError,
  BadRequest,
  InvalidUserInput,
  ResourceDuplicationError,
  ResourceNotFoundError,
} from 'modules/exceptions';
import { User } from 'core/data/models/User';
import {
  AuthService,
  UserService,
  VerificationCodeService,
  FavoriteTeamService,
  SMSService,
  MailerService,
  FanClubService,
} from 'core/services';

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
  TokenInfoParams,
  TokenInfoResult,
  RevokeTokenParams,
  RevokeTokenResult,
  GetMeParams,
  GetMeResult,
  ProfileParams,
  ProfileResult,
  UserAndTeams,
  UpdateProfileParams,
  UpdateProfileResult,
  UpdateProfileStatusType,
  UpdateProfileFieldResult,
  UpdateProfileFieldParams,
} from './types';

class UserController extends BaseController {
  static async checkUsernameExistence({
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

    if (provider) {
      await VerificationCodeService.store({
        code,
        provider,
        phone,
        email,
      });
    }

    return {
      data: {
        success: !!provider,
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
        valid: !!verificationCode,
        details: verificationCode,
      },
    };
  }

  static async register({
    fingerprint,
    ip,
    device,
    osName,
    osVersion,
    browser,
    userAgent,
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
        errorCode: UserErrorEnum.invalidVerificationCode,
        message: 'Your provided verification code is invalid or is expired.',
      });
    }

    const isUsernameTaken = await UserService.isUsernameTaken(username);
    if (isUsernameTaken) {
      throw new ResourceDuplicationError({
        errorCode: UserErrorEnum.usernameTaken,
        message: 'The username is already taken.',
      });
    }

    if (email) {
      const isEmailTaken = await UserService.isEmailTaken(email);
      if (isEmailTaken) {
        throw new ResourceDuplicationError({
          errorCode: UserErrorEnum.emailTaken,
          message: 'The email address is already taken.',
        });
      }
    } else if (phone) {
      const isPhoneTaken = await UserService.isPhoneTaken(phone);
      if (isPhoneTaken) {
        throw new ResourceDuplicationError({
          errorCode: UserErrorEnum.phoneTaken,
          message: 'The phone number is already taken.',
        });
      }
    }

    const { user, token } = await this.withTransaction(async transaction => {
      const user = await UserService.create(
        {
          email,
          phone,
          avatar,
          username,
          fullname,
        },
        transaction
      );

      if (teamId) {
        const userId = user.getDataValue('id');
        await FavoriteTeamService.add(
          {
            userId,
            teamId,
          },
          transaction
        );
      }

      await VerificationCodeService.removeVerificationCode(
        {
          phone,
          email,
          code,
        },
        transaction
      );

      const token = await AuthService.generateAuthToken(
        {
          userId: user.getDataValue('id'),
          fingerprint,
        },
        {
          ip,
          device,
          osName,
          osVersion,
          browser,
          userAgent,
        },
        transaction
      );

      return { user, token };
    });

    return {
      token: token,
      data: {
        success: true,
        user: await this.mergeUserAndTeams(user),
      },
    };
  }

  static async login({
    fingerprint,
    ip,
    device,
    osName,
    osVersion,
    browser,
    userAgent,
    code,
    email,
    phone,
  }: UserLoginParams): UserLoginResult {
    const verificationCode = await VerificationCodeService.getVerificationCode({
      phone,
      email,
      code,
    });

    if (verificationCode == null) {
      throw new BadRequest({
        errorCode: UserErrorEnum.invalidVerificationCode,
        message: 'Your provided verification code is invalid or is expired.',
      });
    }

    if (email) {
      const isEmailAvailable = await UserService.isEmailAvailable(email);
      if (isEmailAvailable) {
        throw new AuthenticationError({
          errorCode: UserErrorEnum.incorrectEmail,
          message: 'Incorrect email address provided.',
        });
      }
    } else if (phone) {
      const isPhoneAvailable = await UserService.isPhoneAvailable(phone);
      if (isPhoneAvailable) {
        throw new AuthenticationError({
          errorCode: UserErrorEnum.incorrectPhone,
          message: 'Incorrect email address provided.',
        });
      }
    }

    const user = await UserService.findByUniqueIdentifier({
      email,
      phone,
    });

    if (!user) {
      if (email) {
        throw new AuthenticationError({
          errorCode: UserErrorEnum.incorrectEmail,
          message: 'Incorrect email address provided.',
        });
      } else if (phone) {
        throw new AuthenticationError({
          errorCode: UserErrorEnum.incorrectPhone,
          message: 'Incorrect email address provided.',
        });
      }

      throw new InvalidUserInput({
        errorCode: UserErrorEnum.requiredEmailOrPhone,
        message: 'Email address or phone number required.',
      });
    }

    const token = await this.withTransaction(async transaction => {
      await VerificationCodeService.removeVerificationCode(
        {
          phone,
          email,
          code,
        },
        transaction
      );

      const token = await AuthService.generateAuthToken(
        {
          userId: user.getDataValue('id'),
          fingerprint,
        },
        {
          ip,
          device,
          osName,
          osVersion,
          browser,
          userAgent,
        },
        transaction
      );

      return token;
    });

    return {
      token: token,
      data: {
        success: true,
        user: await this.mergeUserAndTeams(user),
      },
    };
  }

  static async getTokenInfo({ token }: TokenInfoParams): TokenInfoResult {
    const decodedData = AuthService.decode(token, true);
    let model = null;

    if (decodedData) {
      model = await AuthService.getUserSession(decodedData.fingerprint, token);
    }

    return {
      data: {
        info: model,
      },
    };
  }

  static async revokeToken({ token }: RevokeTokenParams): RevokeTokenResult {
    const decodedData = AuthService.decode(token, true);
    let success = false;

    if (decodedData) {
      await AuthService.removeUserSession(decodedData.fingerprint, token);
      success = true;
    }

    return {
      data: {
        success,
      },
    };
  }

  static async getMe({ token }: GetMeParams): GetMeResult {
    const decodedData = AuthService.decode(token, true);
    const authToken = await AuthService.getUserSession(decodedData!.fingerprint, token);

    const user = await UserService.findByUniqueIdentifier({
      id: authToken.getDataValue('userId'),
    });

    return {
      data: {
        user: await this.mergeUserAndTeams(user),
      },
    };
  }

  /**
   * Update user's profile.
   */
  static async updateProfile({
    userId,
    code,
    phone,
    email,
    fullname,
    avatar,
  }: UpdateProfileParams): UpdateProfileResult {
    const status: UpdateProfileStatusType = await this.withTransaction(
      async (transaction): Promise<UpdateProfileStatusType> => {
        // update user's email address
        if (email) {
          const { actionStatus, codeGenerated } =
            await this.updateProfileConfirmableField(
              {
                field: 'email',
                value: email,
                provider: NotifiedProviderEnum.email,
                code,
              },
              transaction
            );

          if (actionStatus === 'updated') {
            await UserService.updateEmail({ userId, email }, transaction);
          } else if (actionStatus === 'confirmation-sent') {
            await MailerService.sendVerificationCode({ code: codeGenerated, email });
          }

          return actionStatus;
        }

        // update user's phone number
        if (phone) {
          const { actionStatus, codeGenerated } =
            await this.updateProfileConfirmableField(
              {
                field: 'phone',
                value: phone,
                provider: NotifiedProviderEnum.sms,
                code,
              },
              transaction
            );

          if (actionStatus === 'updated') {
            await UserService.updatePhone({ userId, phone }, transaction);
          } else if (actionStatus === 'confirmation-sent') {
            await SMSService.sendVerificationCode({ code: codeGenerated, phone });
          }

          return actionStatus;
        }

        // update user's full name.
        if (fullname) {
          await UserService.updateFullname({ userId, fullname }, transaction);
          return 'updated';
        }

        // update user's avatar
        if (typeof avatar !== 'undefined') {
          await UserService.updateAvatar({ userId, avatar }, transaction);
          return 'updated';
        }

        return 'no-action';
      }
    );

    return { data: { status } };
  }

  /**
   * Get user profile by their ID.
   */
  static async getProfile({ userId }: ProfileParams): ProfileResult {
    const user = await UserService.findByUniqueIdentifier({
      id: userId,
    });

    if (!user) {
      throw new ResourceNotFoundError({
        message: 'User not found.',
      });
    }

    const fanClubs = await FanClubService.getUserFanClubs(userId);
    const teams = await FavoriteTeamService.getUserFavoriteTeams(userId);

    return {
      data: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ...user.dataValues,
        fanClubs,
        teams,
      },
    };
  }

  private static async updateProfileConfirmableField(
    { field, value, provider, code }: UpdateProfileFieldParams,
    transaction?: Transaction
  ): Promise<UpdateProfileFieldResult> {
    const userExists = await UserService.findByUniqueIdentifier({
      [field]: value,
    });

    if (userExists) {
      return { actionStatus: 'user-exists', codeGenerated: null };
    }

    if (code) {
      const verificationCode = await VerificationCodeService.getVerificationCode({
        code,
        [field]: value,
      });

      if (!verificationCode) {
        throw new BadRequest({
          errorCode: UserErrorEnum.invalidVerificationCode,
          message: 'Your provided verification code is invalid or is expired.',
        });
      }

      await VerificationCodeService.removeVerificationCode(
        {
          [field]: value,
          code,
        },
        transaction
      );

      return { actionStatus: 'updated', codeGenerated: null };
    }

    const codeGenerated = await VerificationCodeService.generate();
    await VerificationCodeService.store(
      {
        code: codeGenerated,
        [field]: value,
        provider: provider,
      },
      transaction
    );

    return { actionStatus: 'confirmation-sent', codeGenerated };
  }

  private static async mergeUserAndTeams(user: Nullable<User>): Promise<UserAndTeams> {
    if (!user) {
      return null;
    }

    const favoriteTeams = await FavoriteTeamService.getTeamsIdList(
      user.getDataValue('id')
    );

    const result: UserAndTeams = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...(user.dataValues as User),
      teams: favoriteTeams,
    };

    return result;
  }
}

export default UserController;
