import { ClientResponse } from '@sendgrid/mail';

// eslint-disable-next-line @typescript-eslint/ban-types
export type ResultType = [ClientResponse, {}];

interface FromInterface {
  name: string;
  email: string;
}

export type FromType = string | FromInterface;

interface SendEmailCommonOptionsInterface {
  from?: FromType;
  subject: string;
  html: string;
}

export interface SendEmailFinalOptionsInterface
  extends Omit<SendEmailCommonOptionsInterface, 'from'> {
  from: FromType;
  to: string;
  cc?: string[];
  bcc?: string[];
}

export interface SendEmailSingleOptionsInterface extends SendEmailCommonOptionsInterface {
  to: string;
}

export interface SendEmailMultipleOptionsInterface
  extends SendEmailCommonOptionsInterface {
  to: string[];
}
