import { Middleware, Next as KoaNext } from 'koa';
import { Context } from 'types';
import { AuthService } from 'core/services';
import { authConfig } from 'config';
import { AuthTokenResultInterface } from 'core/services/AuthService';
import db from 'core/data/models';

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

const getTokenModel = async (ctx: Context, authToken: string) => {
  const model = await AuthService.getUserSession(ctx.device.fingerprint, authToken);
  if (!model) {
    delete ctx.headers['authorization'];
  } else {
    model.setDataValue('lastAccess', Date.now());
    await model.save();
  }

  return model;
};

const reUpdateTokenIfExpired = (
  ctx: Context,
  authToken: string
): AuthTokenResultInterface | null => {
  const data = AuthService.decode(authToken, true);
  if (!data) {
    return null;
  }

  const isExpired = Date.now() + expireOffset < data.expiresAt;
  if (!isExpired) {
    return null;
  }

  const token = AuthService.generateAuthToken({
    userId: data.userId,
    fingerprint: ctx.device.fingerprint,
  });

  return token;
};

const isContainsTokenMeta = (ctx: Context): boolean => {
  return (
    'object' == typeof ctx.body &&
    'object' == typeof ctx.body.meta &&
    'object' == typeof ctx.body.meta.token
  );
};

const storeAuthToken = async (
  ctx: Context,
  token: AuthTokenResultInterface,
  isReGeneratedToken: boolean
) => {
  if (!isContainsTokenMeta(ctx)) {
    return;
  }

  (token as any).isReGenerated = isReGeneratedToken;

  if (isReGeneratedToken) {
    const model = await getTokenModel(ctx, token.authToken);
    if (null != model) {
      try {
        model.setDataValue('authToken', token.authToken);
        model.setDataValue('tokenExpiresAt', token.expiresAt);
        await model.save();
      } catch (e) {
        console.error(e);
      }
    }

    return;
  }

  try {
    await db.UserSession.create({
      userId: token.userId,
      fingerprint: ctx.device.fingerprint,
      ip: ctx.ip,
      device: ctx.device.type,
      osName: ctx.device.os.name,
      osVersion: ctx.device.os.version,
      browser: ctx.device.browser,
      userAgent: ctx.headers['user-agent'],
      lastAccess: Date.now(),
      authToken: token.authToken,
      tokenExpiresAt: token.expiresAt,
    });
  } catch (e) {
    console.error(e);
  }
};

const handleNext = async (ctx: Context, next: KoaNext) => {
  await next();

  if (isContainsTokenMeta(ctx)) {
    // store token into database if it's generated in controller
    await storeAuthToken(ctx, ctx.body.meta.token, false);
  }
};

export default (): Middleware => {
  return async (ctx: Context, next: KoaNext) => {
    let authToken = getAuthToken(ctx);
    if (null == authToken) {
      return handleNext(ctx, next);
    }

    const model = await getTokenModel(ctx, authToken);
    if (null == model) {
      return handleNext(ctx, next);
    }

    const newAuthTokenResult = await reUpdateTokenIfExpired(ctx, authToken);
    if (null != newAuthTokenResult) {
      authToken = newAuthTokenResult.authToken;
      updateAuthTokenHeader(ctx, authToken);
    }

    await next();
    if (null != newAuthTokenResult) {
      // store regenerated token into database (update existing)
      await storeAuthToken(ctx, newAuthTokenResult, true);
    }
  };
};
