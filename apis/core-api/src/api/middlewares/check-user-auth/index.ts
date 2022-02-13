import { Middleware, Next as KoaNext } from 'koa';
import { Context } from 'types';
import { UserErrorEnum } from '@ultras/utils';
import { AuthenticationError } from 'modules/exceptions';
import { AuthService } from 'core/services';
import { AuthTokenResultInterface } from 'core/services/AuthService';

interface OptionsInterface {
  regenerateOnExpire?: boolean;
}

const getAuthToken = (ctx: Context): null | string => {
  const token = ctx.headers['authorization'];
  if (!token) {
    return null;
  }

  return token.replace('Bearer ', '');
};

const updateAuthTokenHeader = (ctx: Context, newAuthToken: AuthTokenResultInterface) => {
  ctx.set('X-New-AuthToken', newAuthToken.authToken);
  ctx.newAuthToken = newAuthToken;

  ctx.headers['authorization'] = `Bearer ${newAuthToken.authToken}`;
};

const getTokenModel = (ctx: Context, authToken: string) => {
  return AuthService.getUserSession(ctx.device.fingerprint, authToken);
};

const isExpired = (authToken: string) => {
  const data = AuthService.decode(authToken, true);
  if (!data) {
    return true;
  }

  const isExpired = Date.now() >= data.expiresAt;
  return isExpired;
};

const updateTokenIfExpired = async (
  ctx: Context,
  authToken: string
): Promise<AuthTokenResultInterface | null> => {
  if (!isExpired(authToken)) {
    return null;
  }

  const data = AuthService.decode(authToken, true);
  if (!data) {
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

const callNextFunc = async (ctx: Context, next: KoaNext, authToken: string) => {
  await AuthService.updateLastAccess(ctx.device.fingerprint, authToken);
  ctx.user = AuthService.decode(authToken, true);

  return next();
};

export default (options?: OptionsInterface): Middleware => {
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

    if (false === options?.regenerateOnExpire) {
      if (!isExpired(authToken)) {
        return callNextFunc(ctx, next, authToken);
      }

      throw new AuthenticationError({
        errorCode: UserErrorEnum.authTokenExpired,
        message: 'Authorization token is expired.',
      });
    }

    const newAuthTokenResult = await updateTokenIfExpired(ctx, authToken);
    if (newAuthTokenResult) {
      authToken = newAuthTokenResult.authToken;
      updateAuthTokenHeader(ctx, newAuthTokenResult);
    }

    await callNextFunc(ctx, next, authToken);

    if (newAuthTokenResult) {
      if ('object' == typeof ctx.body && ctx.body) {
        ctx.body.token = newAuthTokenResult;
      }
    }
  };
};
