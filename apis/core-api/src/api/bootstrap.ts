import { mailerConfig, smsConfig, pushNotificationConfig } from 'config';

import MailerService from '@ultras/services/MailerService';
import SMSService from '@ultras/services/SMSService';
import PushNotificationService from '@ultras/services/PushNotificationService';

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

  // initiate push notification service
  PushNotificationService.initiate(
    pushNotificationConfig.projectId,
    pushNotificationConfig.clientEmail,
    pushNotificationConfig.privateKeyFile,
    pushNotificationConfig.privateKey
  );
};

export default bootstrap;
