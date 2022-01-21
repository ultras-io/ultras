import CoreSMSService from '@ultras/services/SMSService';
import BaseService from 'abstraction/BaseService';

class SMSService extends BaseService {
  static async sendVerificationCode({ phone, code }: any): Promise<boolean> {
    const result = await CoreSMSService.send({
      to: phone,
      body: `Your verification code: ${code}`,
    });

    if (!result || result.errorCode) {
      return false;
    }

    return true;
  }
}

export default SMSService;
