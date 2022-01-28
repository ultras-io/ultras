import { Context } from 'types';

import set from 'lodash/set';

/**
 * function to modify response
 * you can set response body for the following ways:
 *    1. ctx.ok(users)
 *    2. ctx.ok({ data: users })
 *    3. ctx.ok({ data: users, meta: { refreshToken } })
 *    4. ctx.ok({ meta: { refreshToken } })
 * In any case the actual response will be { data: {}, meta: {} } except for the
 *   following conditions:
 *    - when status code >= 204 and status code < 400 at the same time or
 *      status code = 405 in this cases actual response will not be modified
 * @param {Context} ctx - koa context
 */
export default (ctx: Context): void => {
  if ((ctx.status >= 204 && ctx.status < 400) || ctx.status === 405 || !ctx.body) {
    return;
  }

  let result = ctx.body;
  if (result && result.dataValues) {
    result = result.dataValues;
  }

  const response = {
    meta: {},
  };

  const pagination = {};
  // eslint-disable-next-line no-prototype-builtins
  if (Array.isArray(result.data) && result.hasOwnProperty('total')) {
    set(pagination, 'limit', parseInt(ctx.request.query.limit || result.limit, 10));
    // if offset not provided , it should be null,
    // but offset of s3 request is not a number  so we can't parse the request's offset
    set(pagination, 'offset', parseInt(ctx.request.query.limit || result.offset, 10));
    set(pagination, 'total', result.total);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    set(response.meta, 'pagination', pagination);
  }

  if (result && result.token) {
    set(response.meta, 'token', result.token);
    delete result.token;
  }

  if ('object' == typeof result) {
    if (result.status) {
      set(ctx, 'status', result.status);
      delete result.status;
    }
    if (!result.data && !result.meta) {
      result.data = { ...result };
    }
    if (!result.meta && result.data) {
      result.meta = {};
    }
  } else {
    set(ctx, 'status', 403);
    result = {
      meta: {},
      data: [],
    };
  }

  set(response, 'data', result.data);
  // set(response, 'meta', result.meta); @TODO check why is need this line

  ctx.body = response;
};
