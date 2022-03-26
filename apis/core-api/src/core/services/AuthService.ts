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
  /**
   * Generate auth token based on user id and requested device.
   */
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

    // create new session model if user login with device first time, otherwise
    // we need to update previous token and expiration time.
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

  /**
   * Verify provided auth token is valid.
   */
  static verifyAccessToken(token: string): boolean {
    return null != this.decode(token);
  }

  /**
   * Decode provided auth token.
   * In case of invalid auth token NULL will be returned.
   */
  static decode<T = FinalDataToHashInterface>(
    token: string,
    ignoreExpiration = false
  ): T | null {
    try {
      const options = {
        ignoreExpiration: ignoreExpiration,
      };

      return jwt.verify(token, authConfig.accessTokenSecret, options) as T;
    } catch (e) {
      return null;
    }
  }

  /**
   * Get user session by device and user id.
   */
  static getUserSession(fingerprint: string, authToken: string) {
    return db.UserSession.findOne({
      where: {
        fingerprint,
        authToken,
      },
    });
  }

  /**
   * Update user session last access time.
   */
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

  /**
   * Remove user session from database (like logout action).
   *
   * User session are stored in database using paranoid (soft-delete) option,
   * so real session will not be deleted from database, it just updates "deletedAt"
   * field.
   *
   * To deleting model pass "forceDelete = TRUE" to remove from database.
   */
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
