import { authConfig } from 'config';
import { DbIdentifier } from 'types';
import jwt from 'jsonwebtoken';
import BaseService from './BaseService';

interface DataToHashInterface {
  userId: DbIdentifier;
  fingerprint: string;
}

interface AuthTokenResultInterface {
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
      authToken,
      expiresAt,
    };
  }

  static verifyAccessToken(token: string): boolean {
    return null != this.decode(token);
  }

  static decode<T = any>(token: string): T | null {
    try {
      return jwt.verify(token, authConfig.accessTokenSecret) as T;
    } catch (e) {
      return null;
    }
  }
}

export default AuthService;
