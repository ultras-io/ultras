import CoreMailerService from '@ultras/services/MailerService';
import BaseService from './BaseService';

class MailerService extends BaseService {
  /**
   * Send user register/login confirmation code to email.
   */
  static async sendVerificationCode({ email, code }: any): Promise<boolean> {
    try {
      const result = await CoreMailerService.send({
        to: email,
        subject: 'Ultras verification',
        html: `Your verification code: ${code}`,
      });

      return result[0].statusCode < 400;
    } catch (e) {
      return false;
    }
  }
}

export default MailerService;
