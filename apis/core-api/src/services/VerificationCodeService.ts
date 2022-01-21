import { generateToken, NotifiedProviderEnum } from '@ultras/utils';
import BaseService from 'abstraction/BaseService';
import resources from 'core/data/lcp';
import db from 'core/data/models';

interface StoreInterface {
  code: string;
  provider: NotifiedProviderEnum;
  phone?: null | string;
  email?: null | string;
}

// 20 minute
const expireAfterMs = 20 * 60 * 1000;

class VerificationCodeService extends BaseService {
  static async generate(length = 4): Promise<string> {
    return generateToken(length, {
      number: true,
    });
  }

  static async store({ code, provider, phone, email }: StoreInterface): Promise<void> {
    const expirationTimestamp = Date.now() + expireAfterMs;

    await db.VerificationCode.create({
      code,
      provider,
      phone,
      email,
      expirationTimestamp,
    });
  }

  static async removeExpiredCodes(): Promise<void> {
    await db.VerificationCode.destroy({
      where: {
        expirationTimestamp: {
          [db.Sequelize.Op.lte]: Date.now(),
        },
      },
    });
  }
}

export default VerificationCodeService;
