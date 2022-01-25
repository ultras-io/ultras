import * as sendGrid from '@sendgrid/mail';
import {
  SendEmailSingleOptionsInterface,
  SendEmailMultipleOptionsInterface,
  SendEmailFinalOptionsInterface,
  FromType,
  ResultType,
} from './types';

class MailerService {
  private static staticInstance: null | MailerService = null;
  private static singleton(): MailerService {
    if (null == this.staticInstance) {
      throw new Error('Please initiate MailerService before using.');
    }

    return this.staticInstance;
  }

  static initiate(sendGridApiKey: string, defaultSender: null | FromType = null) {
    this.staticInstance = new MailerService(sendGridApiKey, defaultSender);
  }

  constructor(
    private sendGridApiKey: string,
    private defaultSender: null | FromType = null
  ) {
    sendGrid.setApiKey(this.sendGridApiKey);
  }

  private async sendEmail(options: SendEmailSingleOptionsInterface): Promise<ResultType> {
    if ('undefined' === typeof options.from) {
      options.from = this.defaultSender || '';
    }

    if ('object' === typeof options.from) {
      options.from = `${options.from.name} <${options.from.email}>`;
    }

    return sendGrid.send(options as SendEmailFinalOptionsInterface, false);
  }

  static async send(options: SendEmailSingleOptionsInterface): Promise<ResultType> {
    return this.singleton().send(options);
  }

  async send(options: SendEmailSingleOptionsInterface): Promise<ResultType> {
    return this.sendEmail(options);
  }

  static async sendMultiple(options: SendEmailMultipleOptionsInterface, viaBcc = true) {
    return this.singleton().sendMultiple(options);
  }

  async sendMultiple(options: SendEmailMultipleOptionsInterface, viaBcc = true) {
    if (!Array.isArray(options.to)) {
      options.to = [options.to];
    }

    const optionsClone = {
      ...options,
      to: options.to[0],
    };

    const newOptions = optionsClone as SendEmailFinalOptionsInterface;
    options.to.slice(1).forEach(email => {
      if (viaBcc) {
        newOptions.bcc = newOptions.bcc || [];
        newOptions.bcc.push(email);
      } else {
        newOptions.cc = newOptions.cc || [];
        newOptions.cc.push(email);
      }
    });

    return this.sendEmail(newOptions);
  }
}

export default MailerService;
