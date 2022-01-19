export interface SendSMSOptionsInterface {
  from?: string;
  messagingServiceSid?: string;
  to: string;
  body: string;
}

export interface SendSMSMultipleOptionsInterface
  extends Omit<SendSMSOptionsInterface, 'to'> {
  to: Array<string>;
}
