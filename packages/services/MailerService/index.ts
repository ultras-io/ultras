import * as sendGrid from '@sendgrid/mail';
import {
  SendEmailSingleOptionsInterface,
  SendEmailMultipleOptionsInterface,
  SendEmailFinalOptionsInterface,
  FromType,
  ResultType,
} from './types';

class MailerService {
  constructor(
    private sendGridApiKey: string,
    private defaultSender: null | FromType = null
  ) {
    sendGrid.setApiKey(this.sendGridApiKey);
  }

  private async sendEmail(options: SendEmailFinalOptionsInterface): Promise<ResultType> {
    if ('undefined' === typeof options.from) {
      options.from = this.defaultSender || '';
    }

    if ('object' === typeof options.from) {
      options.from = `${options.from.name} <${options.from.email}>`;
    }

    return sendGrid.send(options, false);
  }

  async send(options: SendEmailSingleOptionsInterface): Promise<ResultType> {
    return this.sendEmail(options);
  }

  async sendMultiple(options: SendEmailMultipleOptionsInterface, viaBcc = true) {
    if (!Array.isArray(options.to)) {
      options.to = [options.to];
    }

    const newOptions: SendEmailFinalOptionsInterface = {
      ...options,
      to: options.to[0],
    };

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
