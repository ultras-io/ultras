import jwt from 'jsonwebtoken';
import BaseService from 'services/BaseService';
import { User } from 'core/data/models/User';

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

  static async verifyAccessToken(token: string): ServiceResultType<boolean> {
    try {
      this.decode(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  static async decode<T = any>(token: string): ServiceResultType<T> {
    return jwt.verify(token, this.getSecret()) as T;
  }
}

export default AuthService;
