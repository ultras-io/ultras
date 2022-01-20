import { Twilio as TwilioClient } from 'twilio';
import { SendSMSMultipleOptionsInterface, SendSMSOptionsInterface } from './types';

class SMSService {
  private client: null | TwilioClient = null;

  constructor(
    private accountSid: string,
    private authToken: string,
    private defaultSender: null | string = null
  ) {
    this.client = new TwilioClient(this.accountSid, this.authToken);
  }

  async send(options: SendSMSOptionsInterface) {
    const optionsClone = { ...options };
    if (!optionsClone.from) {
      optionsClone.from = this.defaultSender || '';
    }

    return this.client?.messages.create({
      ...optionsClone,
    });
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
