import { NotifiedProviderEnum } from '@ultras/utils';
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
}>;

export type UserVerifyCodeParams = PhoneOrEmail & {
  code: string;
};

export type UserVerifyCodeResult = ControllerResultType<{
  success: boolean;
}>;

export type UserRegistrationParams = PhoneOrEmail & {
  code: string;
  username: string;
  fullname?: string;
  teamId: DbIdentifier;
};

export type UserRegistrationResult = ControllerResultType<{
  success: boolean;
}>;
