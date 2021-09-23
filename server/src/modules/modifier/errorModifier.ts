import { JWT_ERRORS } from 'modules/exceptions/constants';
import {
  // SequelizeError,
  BaseError,
  InternalServerError,
  AuthenticationError,
} from 'modules/exceptions';
import { AuthErrorDetail, Context, ErrorDetail, Exception } from 'types';

function normalizeError(exception: Exception | AuthErrorDetail | ErrorDetail) {
  // if (SEQUELIZE_ERRORS[exception.name]) {
  //   return new SequelizeError(exception);
  // }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (exception instanceof JWT_ERRORS[exception.name]) {
    return new AuthenticationError(exception);
  }

  return exception;
}
export default (ctx: Context, exception: ErrorDetail): BaseError<any, any> => {
  exception = normalizeError(exception);
  if (exception instanceof BaseError) {
    console.error(exception);
    return exception;
  }
  console.error(exception);
  return new InternalServerError();
};
