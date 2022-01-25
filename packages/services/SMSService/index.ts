import { Twilio as TwilioClient } from 'twilio';
import { SendSMSMultipleOptionsInterface, SendSMSOptionsInterface } from './types';

class SMSService {
  private static staticInstance: null | SMSService = null;
  private static singleton(): SMSService {
    if (null == this.staticInstance) {
      throw new Error('Please initiate SMSService before using.');
    }

    return this.staticInstance;
  }

  static initiate(
    accountSid: string,
    authToken: string,
    defaultMessageServiceId: null | string = null,
    defaultSender: null | string = null
  ) {
    this.staticInstance = new SMSService(
      accountSid,
      authToken,
      defaultMessageServiceId,
      defaultSender
    );
  }

  private client: null | TwilioClient = null;

  constructor(
    private accountSid: string,
    private authToken: string,
    private defaultMessageServiceId: null | string = null,
    private defaultSender: null | string = null
  ) {
    this.client = new TwilioClient(this.accountSid, this.authToken);
  }

  static async send(options: SendSMSOptionsInterface) {
    return this.singleton().send(options);
  }

  async send(options: SendSMSOptionsInterface) {
    const optionsClone = { ...options };
    if (!optionsClone.messagingServiceSid) {
      optionsClone.messagingServiceSid = this.defaultMessageServiceId || '';
    }
    if (!optionsClone.from) {
      optionsClone.from = this.defaultSender || '';
    }

    return this.client?.messages.create({
      ...optionsClone,
    });
  }

  static async sendMultiple(options: SendSMSMultipleOptionsInterface) {
    return this.singleton().sendMultiple(options);
  }

  async sendMultiple(options: SendSMSMultipleOptionsInterface) {
    const results = [];
    for (let i = 0; i < options.to.length; ++i) {
      const itemOptions: SendSMSOptionsInterface = {
        ...options,
        to: options.to[i],
      };

      const result = await this.send(itemOptions);
      results.push(result);
    }

    return results;
  }
}

export default SMSService;
