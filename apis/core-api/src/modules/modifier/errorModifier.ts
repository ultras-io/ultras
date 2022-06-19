import { JWT_ERRORS, SEQUELIZE_ERRORS } from 'modules/exceptions/constants';
import {
  SequelizeError,
  BaseError,
  InternalServerError,
  RateLimitExceeded,
  AuthenticationError,
} from 'modules/exceptions';
import { AuthErrorDetail, Context, ErrorDetail, Exception } from 'types';

function normalizeError(exception: Exception | AuthErrorDetail | ErrorDetail) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (SEQUELIZE_ERRORS[exception.name]) {
    return new SequelizeError(exception);
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // if (exception instanceof JWT_ERRORS[exception.name]) {
  //   return new AuthenticationError(exception);
  // }

  return exception;
}

export default (ctx: Context, exception: ErrorDetail): BaseError<any, any> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  exception = normalizeError(exception);

  // eslint-disable-next-line no-console
  console.error(exception);

  if (exception instanceof BaseError) {
    // eslint-disable-next-line no-console
    return exception;
  }

  if (ctx.status == 429) {
    return new RateLimitExceeded({ message: ctx.body });
  }

  return new InternalServerError();
};
