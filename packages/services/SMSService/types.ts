export interface ISendSMSOptions {
  from?: string;
  messagingServiceSid?: string;
  to: string;
  body: string;
}

export interface ISendSMSMultipleOptions extends Omit<ISendSMSOptions, 'to'> {
  to: Array<string>;
}
