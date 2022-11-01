import { FanClubsViewModel, TeamsViewModel, UserViewModel } from '@ultras/view-models';
import { NotifiedProviderEnum, UserErrorEnum } from '@ultras/utils';
import { User } from 'core/data/models/User';
import { VerificationCodeAttributes } from 'core/data/models/VerificationCode';
import { ControllerResultType, ResourceIdentifier } from 'types';

type WithPhoneOrEmail = {
  phone?: null | string;
  email?: null | string;
};
type WithVerificationCode = {
  code: string;
};
type WithDeviceInfo = {
  ip: string;
  device: string;
  osName: string;
  osVersion: string;
  browser: string;
  userAgent: string;
};
type WithFingerprint = {
  fingerprint: string;
};

export type AuthTokenType = {
  authToken: string;
  expiresAt: number;
};

export type UserCheckUsernameParams = {
  username: string;
};

export type UserCheckUsernameResult = ControllerResultType<{
  available: boolean;
}>;

export type UserConfirmIdentityParams = WithPhoneOrEmail;
export type UserConfirmIdentityResult = ControllerResultType<{
  success: boolean;
  provider: null | NotifiedProviderEnum;
  userExists: boolean;
}>;

export type UserVerifyCodeParams = WithPhoneOrEmail & WithVerificationCode & {};

export type UserVerifyCodeResult = ControllerResultType<{
  valid: boolean;
  details: null | VerificationCodeAttributes;
}>;

export type UserRegistrationParams = WithPhoneOrEmail &
  WithVerificationCode &
  WithFingerprint &
  WithDeviceInfo & {
    username: string;
    avatar?: string;
    fullname?: string;
    teamId?: ResourceIdentifier;
  };

export type UserRegistrationResult = ControllerResultType<
  {
    success: boolean;
    error?: UserErrorEnum;
    user?: UserAndTeams;
    teams?: Array<ResourceIdentifier>;
  },
  {
    token: AuthTokenType;
  }
>;

export type UserLoginParams = WithPhoneOrEmail &
  WithVerificationCode &
  WithFingerprint &
  WithDeviceInfo & {};

export type UserLoginResult = ControllerResultType<
  {
    success: boolean;
    error?: UserErrorEnum;
    user?: UserAndTeams;
  },
  {
    token: AuthTokenType;
  }
>;

export type TokenInfoParams = {
  token: string;
};

export type TokenInfoResult = ControllerResultType<any>;

export type RevokeTokenParams = {
  token: string;
};

export type RevokeTokenResult = ControllerResultType<any>;

export type GetMeParams = {
  token: string;
};

export type GetMeResult = ControllerResultType<{
  user: UserAndTeams;
}>;

export type ProfileParams = {
  userId: ResourceIdentifier;
};

export type ProfileResult = ControllerResultType<
  User & {
    fanClubs: FanClubsViewModel;
    teams: TeamsViewModel;
  }
>;

export type UserAndTeams = Nullable<
  User & {
    teams: Array<ResourceIdentifier>;
  }
>;

export type UpdateProfileStatusType = 'confirmation-sent' | 'updated' | 'no-action';
export type UpdateProfileFieldType = 'phone' | 'email' | 'fullname';

export type UpdateProfileFieldParams = {
  field: UpdateProfileFieldType;
  value: string;
  provider: NotifiedProviderEnum;
  code?: string;
};
export type UpdateProfileFieldResult = {
  actionStatus: UpdateProfileStatusType;
  codeGenerated: Nullable<string>;
};

export type UpdateProfileParams = {
  userId: ResourceIdentifier;
  code?: string;
  phone?: string;
  email?: string;
  fullname?: string;
};

export type UpdateProfileResult = ControllerResultType<{
  status: UpdateProfileStatusType;
}>;
