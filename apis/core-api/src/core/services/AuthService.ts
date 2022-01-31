import { authConfig } from 'config';
import { DbIdentifier } from 'types';
import jwt from 'jsonwebtoken';
import db from 'core/data/models';
import BaseService from './BaseService';

interface DataToHashInterface {
  userId: DbIdentifier;
  fingerprint: string;
}

export interface AuthTokenResultInterface extends DataToHashInterface {
  authToken: string;
  expiresAt: number;
}

class AuthService extends BaseService {
  static generateAuthToken(dataToHash: DataToHashInterface): AuthTokenResultInterface {
    const expiresIn = authConfig.accessTokenLifetime;
    const expiresAt = Date.now() + expiresIn * 1000;

    const authToken = jwt.sign(dataToHash, authConfig.accessTokenSecret, {
      algorithm: 'HS512',
      expiresIn: expiresIn,
    });

    return {
      ...dataToHash,
      authToken,
      expiresAt,
    };
  }

  static verifyAccessToken(token: string): boolean {
    return null != this.decode(token);
  }

  static decode<T = any>(token: string, ignoreExpiration: boolean = false): T | null {
    try {
      const options = {
        ignoreExpiration: ignoreExpiration,
      };

      return jwt.verify(token, authConfig.accessTokenSecret, options) as T;
    } catch (e) {
      return null;
    }
  }

  static getUserSession(fingerprint: string, authToken: string) {
    return db.UserSession.findOne({
      where: {
        fingerprint,
        authToken,
      },
    });
  }
}

export default AuthService;
