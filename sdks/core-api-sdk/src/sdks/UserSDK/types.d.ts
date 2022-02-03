import { DbIdentifier } from '../types';

interface PhoneOrEmailInterface {
  phone?: string;
  email?: string;
}

interface CodeInterface {
  code: string;
}

export interface ConfirmIdentityInterface extends PhoneOrEmailInterface {}

export interface VerifyCodeInterface extends PhoneOrEmailInterface, CodeInterface {}

export interface RegistrationInterface extends PhoneOrEmailInterface, CodeInterface {
  username: string;
  avatar?: string;
  fullname?: string;
  teamId?: DbIdentifier;
}

export interface LoginInterface extends PhoneOrEmailInterface, CodeInterface {}
