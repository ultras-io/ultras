/* eslint-disable no-param-reassign */
/**
 * @author Ruben Aprikyan
 */

'use strict';

const { SEQUELIZE_ERRORS, JWT_ERRORS } = require('../exceptions/constants');
const {
  SequelizeError, BaseError, InternalServerError, AuthenticationError
} = require('../exceptions');

function normalizeError(exception) {
  if (SEQUELIZE_ERRORS[exception.name]) {
    return new SequelizeError(exception);
  }
  if (JWT_ERRORS[exception.name]) {
    return new AuthenticationError(exception);
  }

  return exception;
}

module.exports = (ctx, exception) => {
  exception = normalizeError(exception);
  if (exception instanceof BaseError) {
    console.error(exception);
    return exception;
  }
  console.error(exception);
  return new InternalServerError();
};
