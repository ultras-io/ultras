import compose from 'koa-compose';
import respond from 'koa-respond';
import koaBody from 'koa-body';
import { Middleware } from 'koa';

import { HTTP_STATUS_METHODS } from 'config/constants';

import responseHandler from 'modules/modifier/responseHandler';

export default (): Middleware =>
  compose([
    koaBody(),
    respond({
      statusMethods: HTTP_STATUS_METHODS,
    }),
    responseHandler,
  ]);
