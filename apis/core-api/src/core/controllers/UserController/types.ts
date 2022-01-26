import { NotifiedProviderEnum, UserErrorEnum } from '@ultras/utils';
import { UserAttributes } from 'core/data/models/User';
import { VerificationCodeAttributes } from 'core/data/models/VerificationCode';
import { ControllerResultType, DbIdentifier } from 'types';

type PhoneOrEmail = {
  phone?: null | string;
  email?: null | string;
};

export type UserCheckUsernameParams = {
  username: string;
};

export type UserCheckUsernameResult = ControllerResultType<{
  available: boolean;
}>;

export type UserConfirmIdentityParams = PhoneOrEmail;
export type UserConfirmIdentityResult = ControllerResultType<{
  success: boolean;
  provider: null | NotifiedProviderEnum;
  userExists: boolean;
}>;

export type UserVerifyCodeParams = PhoneOrEmail & {
  code: string;
};

export type UserVerifyCodeResult = ControllerResultType<{
  valid: boolean;
  details: null | VerificationCodeAttributes;
}>;

export type UserRegistrationParams = PhoneOrEmail & {
  code: string;
  username: string;
  avatar?: string;
  fullname?: string;
  teamId?: DbIdentifier;
};

export type UserRegistrationResult = ControllerResultType<{
  success: boolean;
  error?: UserErrorEnum;
  user?: UserAttributes;
}>;

export type UserLoginParams = PhoneOrEmail & {
  userAgent?: null | string;
  code: string;
};

export type UserLoginResult = ControllerResultType<{
  success: boolean;
  error?: UserErrorEnum;
  accessToken?: string;
  user?: UserAttributes;
}>;
