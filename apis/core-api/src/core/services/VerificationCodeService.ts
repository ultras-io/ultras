import { Transaction } from 'sequelize';

import { generateToken, NotifiedProviderEnum } from '@ultras/utils';
import resources from 'core/data/lcp';
import db from 'core/data/models';
import { VerificationCodeAttributes } from 'core/data/models/VerificationCode';

import BaseService from './BaseService';

interface IStore {
  code: string;
  provider: NotifiedProviderEnum;
  phone?: null | string;
  email?: null | string;
}

interface IValidateParams {
  code: string;
  phone?: null | string;
  email?: null | string;
}

interface IValidateResult {
  isValid: boolean;
  provider: null | NotifiedProviderEnum;
}

// 5 minute
const expireAfterMs = 5 * 60 * 1000;

class VerificationCodeService extends BaseService {
  /**
   * Build query than checks verification code and user specific field.
   *
   * User specific field can be one of:
   * 1) email
   * 2) phone
   *
   * If user specific field not provided then NULL will be returned.
   */
  private static buildQuery(
    { code, phone, email }: IValidateParams,
    checkExpirations: boolean
  ) {
    const query: any = {
      [db.Sequelize.Op.and]: [
        {
          code: {
            [db.Sequelize.Op.eq]: code.toString(),
          },
        },
      ],
    };

    if (phone) {
      query[db.Sequelize.Op.and].push({ phone });
    } else if (email) {
      query[db.Sequelize.Op.and].push({ email });
    } else {
      return null;
    }

    if (checkExpirations) {
      query[db.Sequelize.Op.and].push({
        expirationTimestamp: {
          [db.Sequelize.Op.gte]: Date.now(),
        },
      });
    }

    return query;
  }

  /**
   * Generate verification code.
   */
  static async generate(length = 4): Promise<string> {
    return generateToken(length, {
      number: true,
    });
  }

  /**
   * Store generated verification code with user specific identifier.
   */
  static async store(
    { code, provider, phone, email }: IStore,
    transaction?: Transaction
  ): Promise<void> {
    const expirationTimestamp = Date.now() + expireAfterMs;

    await db.VerificationCode.create(
      {
        code,
        provider,
        phone,
        email,
        expirationTimestamp,
      },
      { transaction }
    );
  }

  /**
   * Cleanup verification codes table, remove expired tokens
   */
  static async removeExpiredCodes(transaction?: Transaction): Promise<void> {
    await db.VerificationCode.destroy(
      {
        where: {
          expirationTimestamp: {
            [db.Sequelize.Op.lte]: Date.now(),
          },
        },
      },
      { transaction }
    );
  }

  /**
   * Get verification code instance by code and user specific identifier.
   */
  static async getVerificationCode({
    code,
    phone,
    email,
  }: IValidateParams): Promise<VerificationCodeAttributes | null> {
    const query: any = this.buildQuery({ code, phone, email }, true);
    if (!query) {
      return null;
    }

    const verificationCode = await db.VerificationCode.findOne({
      where: query,
    });

    return verificationCode;
  }

  /**
   * Remove verification code by code and user specific identifier.
   */
  static async removeVerificationCode(
    { code, phone, email }: IValidateParams,
    transaction?: Transaction
  ): Promise<void> {
    const query: any = this.buildQuery({ code, phone, email }, false);

    await db.VerificationCode.destroy(
      {
        where: query,
      },
      { transaction }
    );
  }
}

export default VerificationCodeService;
