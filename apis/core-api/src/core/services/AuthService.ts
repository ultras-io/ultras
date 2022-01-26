import jwt from 'jsonwebtoken';
import { User } from 'core/data/models/User';
import BaseService from './BaseService';

import { ServiceResultType } from 'types';

class AuthService extends BaseService {
  private static getSecret(): string {
    return process.env.ACCESS_TOKEN_SECRET || 'secret';
  }

  static async generateAccessToken(
    user: User,
    mergeData: any = {}
  ): ServiceResultType<string> {
    const dataToHash = {
      userId: user.getDataValue('id'),
      ...mergeData,
    };

    const accessToken = jwt.sign(dataToHash, this.getSecret(), {
      algorithm: 'HS512',
    });

    return accessToken;
  }

  static verifyAccessToken(token: string): boolean {
    return null != this.decode(token);
  }

  static decode<T = any>(token: string): T | null {
    try {
      return jwt.verify(token, this.getSecret()) as T;
    } catch (e) {
      return null;
    }
  }
}

export default AuthService;
