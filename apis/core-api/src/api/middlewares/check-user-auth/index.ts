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

const updateTokenIfExpired = async (
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
    if (!authToken) {
      throw new AuthenticationError({
        errorCode: UserErrorEnum.authTokenRequired,
        message: 'Authorization token header is missing.',
      });
    }

    const model = await getTokenModel(ctx, authToken);
    if (!model) {
      throw new AuthenticationError({
        errorCode: UserErrorEnum.authTokenInvalid,
        message: 'Authorization token is invalid.',
      });
    }

    const newAuthTokenResult = await updateTokenIfExpired(ctx, authToken);
    if (newAuthTokenResult) {
      authToken = newAuthTokenResult.authToken;
      updateAuthTokenHeader(ctx, authToken);
    }

    await AuthService.updateLastAccess(ctx.device.fingerprint, authToken);
    await next();

    if (newAuthTokenResult) {
      if ('object' == typeof ctx.body && ctx.body) {
        ctx.body.token = newAuthTokenResult;
      }
    }
  };
};
