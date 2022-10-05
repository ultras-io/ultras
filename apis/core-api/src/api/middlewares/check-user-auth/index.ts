import { Middleware, Next as KoaNext } from 'koa';
import { Context } from 'types';
import { UserErrorEnum } from '@ultras/utils';
import { AuthenticationError } from 'modules/exceptions';
import { AuthService } from 'core/services';

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

export default (): Middleware => {
  return async (ctx: Context, next: KoaNext) => {
    const authToken = getAuthToken(ctx);

    if (!authToken) {
      throw new AuthenticationError({
        errorCode: UserErrorEnum.authTokenRequired,
        message: 'Authorization token header is missing.',
      });
    }

    if (!ctx.user) {
      throw new AuthenticationError({
        errorCode: UserErrorEnum.authTokenInvalid,
        message: 'Authorization token is invalid.',
      });
    }

    // if token exists, are valid and not expired
    // then we need to continue request
    if (!isExpired(authToken)) {
      return next();
    }

    // auth token expired exception will be thrown
    throw new AuthenticationError({
      errorCode: UserErrorEnum.authTokenExpired,
      message: 'Authorization token is expired.',
    });
  };
};
