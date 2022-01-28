import { mailerConfig, smsConfig } from 'config';

import MailerService from '@ultras/services/MailerService';
import SMSService from '@ultras/services/SMSService';

const bootstrap = () => {
  // initiate mailer service
  MailerService.initiate(mailerConfig.apiKey, {
    name: 'Ultras',
    email: 'info@ultras.io',
  });

  // initiate sms service
  SMSService.initiate(
    smsConfig.accountSid,
    smsConfig.authToken,
    smsConfig.messageServiceId,
    smsConfig.phoneNumber
  );
};

export default bootstrap;
