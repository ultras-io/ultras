import { NotifiedProviderEnum } from '@ultras/utils';
import type { UserViewModel, BaseUserViewModel } from '@ultras/view-models';
import type { ApiResponseBodyType, ResourceIdentifier } from '../types';

interface PhoneOrEmailInterface {
  phone?: string;
  email?: string;
}

interface CodeInterface {
  code: string;
}

export type ConfirmIdentityInterface = PhoneOrEmailInterface;

export interface VerifyCodeInterface extends PhoneOrEmailInterface, CodeInterface {}

export interface RegistrationInterface extends PhoneOrEmailInterface, CodeInterface {
  username: string;
  avatar?: string;
  fullname?: string;
  teamId?: ResourceIdentifier;
}

export interface LoginInterface extends PhoneOrEmailInterface, CodeInterface {}

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
