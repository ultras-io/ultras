import { Middleware, Next as KoaNext } from 'koa';
import { Context } from 'types';
import { UserErrorEnum } from '@ultras/utils';
import { AuthenticationError } from 'modules/exceptions';
import { AuthService } from 'core/services';
import { authConfig } from 'config';
import { AuthTokenResultInterface } from 'core/services/AuthService';
import { X509Certificate } from 'crypto';

const expireOffset = authConfig.authTokenReauthBefore * 1000;

const getAuthToken = (ctx: Context): null | string => {
  const token = ctx.headers['authorization'];
  if (!token) {
    return null;
  }

  return token.replace('Bearer ', '');
};

const updateAuthTokenHeader = (ctx: Context, newAuthToken: string) => {
  ctx.headers['authorization'] = `Bearer ${newAuthToken}`;
};

const getTokenModel = (ctx: Context, authToken: string) => {
  return AuthService.getUserSession(ctx.device.fingerprint, authToken);
};

const reUpdateTokenIfExpired = async (
  ctx: Context,
  authToken: string
): Promise<AuthTokenResultInterface | null> => {
  const data = AuthService.decode(authToken, true);
  if (!data) {
    return null;
  }

  const isExpired = Date.now() + expireOffset >= data.expiresAt;
  if (!isExpired) {
    return null;
  }

  const token = await AuthService.generateAuthToken(
    {
      userId: data.userId,
      fingerprint: ctx.device.fingerprint,
    },
    {
      ip: ctx.ip,
      device: ctx.device.type,
      osName: ctx.device.os.name,
      osVersion: ctx.device.os.version,
      browser: ctx.device.browser,
      userAgent: ctx.headers['user-agent'],
    }
  );

  return token;
};

export default (): Middleware => {
  return async (ctx: Context, next: KoaNext) => {
    let authToken = getAuthToken(ctx);
    if (null == authToken) {
      throw new AuthenticationError(UserErrorEnum.authTokenRequired);
    }

    const model = await getTokenModel(ctx, authToken);
    if (null == model) {
      throw new AuthenticationError(UserErrorEnum.authTokenInvalid);
    }

    const newAuthTokenResult = await reUpdateTokenIfExpired(ctx, authToken);
    if (null != newAuthTokenResult) {
      authToken = newAuthTokenResult.authToken;
      updateAuthTokenHeader(ctx, authToken);
    }

    await AuthService.updateLastAccess(ctx.device.fingerprint, authToken);
    await next();

    if (null != newAuthTokenResult) {
      if ('object' == typeof ctx.body) {
        ctx.body.token = newAuthTokenResult;
      }
    }
  };
};
