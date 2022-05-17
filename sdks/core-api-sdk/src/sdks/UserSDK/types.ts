import { ResourceIdentifier } from '../types';

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
