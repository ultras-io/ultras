import MailerService from '@ultras/services/MailerService';
import SMSService from '@ultras/services/SMSService';

const {
  SENDGRID_API_KEY,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_SENDER_PHONE_NUMBER,
  TWILIO_MESSAGE_SERVICE_ID,
} = process.env as any;

const bootstrap = () => {
  // initiate mailer service
  MailerService.initiate(SENDGRID_API_KEY, {
    name: 'Ultras',
    email: 'info@ultras.io',
  });

  // initiate sms service
  SMSService.initiate(
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_MESSAGE_SERVICE_ID,
    TWILIO_SENDER_PHONE_NUMBER
  );
};

export default bootstrap;
