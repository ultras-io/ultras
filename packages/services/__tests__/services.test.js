'use strict';

const assert = require('assert');
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '.env'),
});

const testingData = {
  phone: '+37455392216',
  email: {
    sender: {
      email: 'info@ultras.io',
      name: 'Ultras',
    },
    recipients: [
      'rado196b@gmail.com',
      'rb.196@live.ru',
      'rado1996@mail.ru',
      'ultras2810@gmail.com',
    ],
    message: (name) => `
      <p>Hi, <b>Dear Developer</b>.</p>
      <p>Email via ${name}</p>
    `,
  },
};

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_SENDER_PHONE_NUMBER,
  TWILIO_MESSAGE_SERVICE_ID,
  SENDGRID_API_KEY,
} = process.env;

const { default: MailerService } = require('../build/MailerService');
const serviceMailer = new MailerService(SENDGRID_API_KEY, testingData.email.sender);

const { default: SMSService } = require('../build/SMSService');
const serviceSms = new SMSService(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

describe('@ultras/services', () => {
  describe('@ultras/services/NetworkService', () => {
    // it('needs tests');
  });

  describe('@ultras/services/MailerService', () => {
    // Send Email via Direct
    it('should send email via direct', async () => {
      try {
        const result = await serviceMailer.send({
          to: testingData.email.recipients[0],
          subject: 'Test Message',
          html: testingData.email.message('Direct'),
        });

        assert.ok(result);
      } catch (err) {
        assert.fail(err.message);
      }
    });

    // Send Email via CC
    it('should send email via cc', async () => {
      try {
        const result = await serviceMailer.sendMultiple({
          to: testingData.email.recipients,
          subject: 'Test Message',
          html: testingData.email.message('CC'),
        }, false);

        assert.ok(result);
      } catch (err) {
        assert.fail(err.message);
      }
    });

    // Send Email via BCC
    it('should send email via bcc', async () => {
      try {
        const result = await serviceMailer.sendMultiple({
          to: testingData.email.recipients,
          subject: 'Test Message',
          html: testingData.email.message('BCC'),
        }, true);

        assert.ok(result);
      } catch (err) {
        assert.fail(err.message);
      }
    });
  });

  describe('@ultras/services/SMSService', () => {
    // Send SMS via Message Service
    it('should send sms via message service', async () => {
      try {
        const result = await serviceSms.send({
          messagingServiceSid: TWILIO_MESSAGE_SERVICE_ID,
          to: testingData.phone,
          body: 'Testing SMS via Message Service',
        });

        assert.ok(result);
      } catch (err) {
        assert.fail(err.message);
      }
    });

    // Send SMS via Phone Number
    it('should send sms via phone number', async () => {
      try {
        const result = await serviceSms.send({
          from: TWILIO_SENDER_PHONE_NUMBER,
          to: testingData.phone,
          body: 'Testing SMS via Phone Number',
        });

        assert.ok(result);
      } catch (err) {
        assert.fail(err.message);
      }
    });
  });
});
