import { ClientResponse } from '@sendgrid/mail';

// eslint-disable-next-line @typescript-eslint/ban-types
export type ResultType = [ClientResponse, {}];

interface IFrom {
  name: string;
  email: string;
}

export type FromType = string | IFrom;

interface ISendEmailCommonOptions {
  from?: FromType;
  subject: string;
  html: string;
}

export interface ISendEmailFinalOptions extends Omit<ISendEmailCommonOptions, 'from'> {
  from: FromType;
  to: string;
  cc?: string[];
  bcc?: string[];
}

export interface ISendEmailSingleOptions extends ISendEmailCommonOptions {
  to: string;
}

export interface ISendEmailMultipleOptions extends ISendEmailCommonOptions {
  to: string[];
}
