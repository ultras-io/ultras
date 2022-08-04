import { Middleware, Next as KoaNext } from 'koa';
import { Context } from 'types';
import { AuthService } from 'core/services';
import { AuthTokenResultInterface } from 'core/services/AuthService';

interface OptionsInterface {
  regenerateOnExpire?: boolean;
}

/**
 * Get auth token from header.
 */
const getAuthToken = (ctx: Context): null | string => {
  const token = ctx.headers['authorization'];
  if (!token) {
    return null;
  }

  return token.replace('Bearer ', '');
};

/**
 * Set new auth token into context.
 */
const updateAuthTokenHeader = (ctx: Context, newAuthToken: AuthTokenResultInterface) => {
  ctx.set('X-New-AuthToken', newAuthToken.authToken);
  ctx.newAuthToken = newAuthToken;

  ctx.headers['authorization'] = `Bearer ${newAuthToken.authToken}`;
};

/**
 * Get token model from database.
 */
const getTokenModel = (ctx: Context, authToken: string) => {
  return AuthService.getUserSession(ctx.device.fingerprint, authToken);
};

/**
 * Check if auth token already expired.
 */
const isExpired = (authToken: string) => {
  const data = AuthService.decode(authToken, true);
  if (!data) {
    return true;
  }

  const isExpired = Date.now() >= data.expiresAt;
  return isExpired;
};

/**
 * Re-generate auth token if previous one is already expired and
 * return to called, otherwise NULL returned.
 */
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

/**
 * There are many steps to do before calling next middleware or controller:
 * 1) update last access time in database.
 * 2) decode user data and append to context.
 */
const callNextFunc = async (ctx: Context, next: KoaNext, authToken: string) => {
  await AuthService.updateLastAccess(ctx.device.fingerprint, authToken);
  ctx.user = AuthService.decode(authToken, true);

  return next();
};

export default (options?: OptionsInterface): Middleware => {
  return async (ctx: Context, next: KoaNext) => {
    // if auth token is not provided by authorization header
    // then we need to skip this middleware action.
    let authToken = getAuthToken(ctx);
    if (!authToken) {
      return next();
    }

    // if provided token not found in our database
    // then we need to skip this middleware action.
    const model = await getTokenModel(ctx, authToken);
    if (!model) {
      return next();
    }

    // if regenerate auth token on expire option is disabled (FALSE)
    // then we need to continue for expired tokens and we don't re-generate
    // new auth token for next request
    //
    // by default it's enabled (TRUE)
    if (false === options?.regenerateOnExpire) {
      // if token exists, are valid and not expired
      // then we need to continue request
      if (!isExpired(authToken)) {
        return callNextFunc(ctx, next, authToken);
      }

      return next();
    }

    // if provided auth token is already expired then we need to
    // re-generate a new one
    const newAuthTokenResult = await updateTokenIfExpired(ctx, authToken);
    if (newAuthTokenResult) {
      authToken = newAuthTokenResult.authToken;
      updateAuthTokenHeader(ctx, newAuthTokenResult);
    }

    // pass request to next middleware or controller
    await callNextFunc(ctx, next, authToken);

    // if new auth token are generated in this request then
    // it will be returned to client.
    if (newAuthTokenResult) {
      if ('object' == typeof ctx.body && ctx.body) {
        ctx.body.token = newAuthTokenResult;
      }
    }
  };
};
