import { NotifiedProviderEnum } from '@ultras/utils';
import type { UserViewModel, BaseUserViewModel } from '@ultras/view-models';
import type { ApiResponseBodyType, ResourceIdentifier } from '../types';

interface IPhoneOrEmail {
  phone?: string;
  email?: string;
}

interface ICode {
  code: string;
}

export type IConfirmIdentity = IPhoneOrEmail;

export interface IVerifyCode extends IPhoneOrEmail, ICode {}

export interface IRegistration extends IPhoneOrEmail, ICode {
  username: string;
  avatar?: string;
  fullname?: string;
  teamId?: ResourceIdentifier;
}

export interface ILogin extends IPhoneOrEmail, ICode {}

export type ConfirmIdentityResponse = ApiResponseBodyType<{
  success: boolean;
  provider: NotifiedProviderEnum;
  userExists: boolean;
}>;

export type VerifyCodeResponse = ApiResponseBodyType<{
  valid: boolean;
  details: null | {
    code: string;
    provider: 'email' | 'phone';
    phone: null | string;
    email: null | string;
    expirationTimestamp: number;
  };
}>;

export type CheckUserExistenceResponse = ApiResponseBodyType<{
  available: boolean;
}>;

type UserAndTeamsType = BaseUserViewModel & {
  teams: Array<ResourceIdentifier>;
};

export type LoginResponse = ApiResponseBodyType<{
  success: boolean;
  user: UserAndTeamsType;
}>;

export type LogoutResponse = ApiResponseBodyType<{
  success: boolean;
}>;

export type GetMeResponse = ApiResponseBodyType<{
  user: UserAndTeamsType;
}>;

export type GetProfileResponse = ApiResponseBodyType<UserViewModel>;

export type UpdateProfileRequest = {
  code?: string;
  phone?: string;
  email?: string;
  fullname?: string;
  avatar?: Nullable<string>;
};

export type UpdateProfileResponse = ApiResponseBodyType<{
  status: 'confirmation-sent' | 'updated' | 'no-action';
}>;
