import { authConfig } from 'config';
import { DbIdentifier, ServiceResultType } from 'types';
import jwt from 'jsonwebtoken';
import db from 'core/data/models';
import BaseService from './BaseService';

interface DataToHashInterface {
  userId: DbIdentifier;
  fingerprint: string;
}

interface FinalDataToHashInterface extends DataToHashInterface {
  expiresIn: number;
  expiresAt: number;
}

export interface AuthTokenResultInterface extends FinalDataToHashInterface {
  authToken: string;
}

export interface DeviceInformationInterface {
  ip: string;
  device: string;
  osName: string;
  osVersion: string;
  browser: string;
  userAgent: string;
}

class AuthService extends BaseService {
  static async generateAuthToken(
    dataToHash: DataToHashInterface,
    device: DeviceInformationInterface
  ): ServiceResultType<AuthTokenResultInterface> {
    const expiresIn = authConfig.accessTokenLifetime;
    const expiresAt = Date.now() + expiresIn * 1000;

    const finalDataToHash: FinalDataToHashInterface = {
      ...dataToHash,
      expiresIn,
      expiresAt,
    };

    const authToken = jwt.sign(finalDataToHash, authConfig.accessTokenSecret, {
      algorithm: 'HS512',
      expiresIn: expiresIn,
    });

    const model = await db.UserSession.findOne({
      where: {
        userId: dataToHash.userId,
        fingerprint: dataToHash.fingerprint,
      },
    });

    if (!model) {
      await db.UserSession.create({
        userId: dataToHash.userId,
        fingerprint: dataToHash.fingerprint,
        ip: device.ip,
        device: device.device,
        osName: device.osName,
        osVersion: device.osVersion,
        browser: device.browser,
        userAgent: device.userAgent,
        lastAccess: Date.now(),
        authToken: authToken,
        tokenExpiresAt: expiresAt,
      });
    } else {
      model.setDataValue('authToken', authToken);
      model.setDataValue('tokenExpiresAt', expiresAt);
      await model.save();
    }

    return {
      ...finalDataToHash,
      authToken,
    };
  }

  static verifyAccessToken(token: string): boolean {
    return null != this.decode(token);
  }

  static decode<T = any>(token: string, ignoreExpiration = false): T | null {
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

  static async updateLastAccess(fingerprint: string, authToken: string) {
    return db.UserSession.update(
      {
        lastAccess: Date.now(),
      },
      {
        where: {
          fingerprint,
          authToken,
        },
        limit: 1,
      }
    );
  }

  static async removeUserSession(
    fingerprint: string,
    authToken: string,
    forceDelete = false
  ) {
    return db.UserSession.destroy({
      where: {
        fingerprint,
        authToken,
      },
      limit: 1,
      force: forceDelete,
    });
  }
}

export default AuthService;
