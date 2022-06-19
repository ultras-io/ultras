import { BASE_ERRORS } from './constants';
import { AuthErrorDetail, ErrorDetail, Exception } from 'types';

class BaseError<T1, T2> extends Error {
  protected details?: T1 | ErrorDetail = {};
  protected exception?: T2 | ErrorDetail = {};

  public getDetails() {
    return this.details;
  }
}

class InternalServerError extends BaseError<null, null> {
  public constructor(details?: ErrorDetail) {
    super();
    this.details = details;
  }

  public getError(): Exception {
    let error: Exception = BASE_ERRORS.INTERNAL_SERVER_ERROR;
    if (this.details) {
      error = { ...error, details: this.details };
    } else {
      error = { ...error, details: BASE_ERRORS.INTERNAL_SERVER_ERROR.debug };
    }

    return error;
  }
}

class RateLimitExceeded extends BaseError<null, null> {
  public constructor(details?: ErrorDetail) {
    super();
    this.details = details;
  }

  public getError(): Exception {
    let error: Exception = BASE_ERRORS.RATE_LIMIT_EXCEEDED;
    if (this.details) {
      error = { ...error, details: this.details };
    } else {
      error = { ...error, details: BASE_ERRORS.RATE_LIMIT_EXCEEDED.debug };
    }

    return error;
  }
}

class InvalidUserCredentials extends BaseError<null, null> {
  public constructor(details: ErrorDetail) {
    super();
    this.details = details;
  }

  public getError(): Exception {
    let error: Exception = BASE_ERRORS.INVALID_USER_CREDENTIALS;

    if (this.details) {
      error = { ...error, details: this.details };
    } else error = { ...error, details: BASE_ERRORS.INVALID_USER_CREDENTIALS.debug };
    return error;
  }
}

class AccessDeniedError extends BaseError<null, null> {
  public constructor(details: ErrorDetail) {
    super();
    this.details = details;
  }

  public getError(): Exception {
    let error: Exception = BASE_ERRORS.ACCESS_DENIED_ERROR;

    if (this.details) {
      return { ...error, details: this.details };
    }
    error = { ...error, details: BASE_ERRORS.ACCESS_DENIED_ERROR.debug };
    return error;
  }
}

class AuthenticationError extends BaseError<AuthErrorDetail | ErrorDetail, null> {
  constructor(details: AuthErrorDetail | ErrorDetail) {
    super();
    this.details = details;
  }

  public getError(): Exception {
    let error: Exception = BASE_ERRORS.AUTHENTICATION_ERROR;
    if (this.details) {
      /*if (this.details?.name) {
        delete this.details.name;
      }*/
      error = { ...error, details: this.details };
    } else {
      error = { ...error, details: BASE_ERRORS.AUTHENTICATION_ERROR.debug };
    }

    return error;
  }
}

class InvalidUserInput extends BaseError<null, null> {
  public constructor(details: ErrorDetail) {
    super();
    this.details = details;
  }

  public getError(): Exception {
    let error: Exception = BASE_ERRORS.INVALID_USER_INPUT;
    if (this.details) {
      /* if (this.details.name) {
        delete this.details.name;
      }*/
      error = { ...error, details: this.details };
    } else {
      error = { ...error, details: BASE_ERRORS.INVALID_USER_INPUT.debug };
    }

    return error;
  }
}

class RequiredParameterNotProvided extends BaseError<null, null> {
  public constructor(details: ErrorDetail) {
    super();
    this.details = details;
  }

  public getError(): Exception {
    let error: Exception = BASE_ERRORS.REQUIRED_PARAMETER_NOT_PROVIDED;
    if (this.details) {
      error = { ...error, details: this.details };
    }
    return error;
  }
}

class SequelizeError extends BaseError<null, null> {
  constructor(exception: ErrorDetail) {
    super();
    this.exception = exception;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (exception?.errors) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      this.details = exception?.errors[0].message;
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      this.details = exception?.message;
    }
  }

  public getError(): Exception {
    let error = BASE_ERRORS.INVALID_USER_INPUT;
    if (this.details) {
      error = { ...error, details: this.details };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      if (!this.exception?.errors) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        [error.details, error.debug] = [error.debug, error.details];
      }
      error.details = {
        message: error.details,
      };
    }
    return error;
  }
}

class TransactionException extends BaseError<null, null> {
  protected mainError: Error | Exception | null = null;

  public constructor(mainError: Error | Exception, details?: ErrorDetail) {
    super();
    this.mainError = mainError;
    this.details = details;
  }

  public getError(): Exception {
    let error: Exception = BASE_ERRORS.BAD_REQUEST;
    if (this.details) {
      error = { ...error, details: this.details };
    } else {
      error = { ...error, details: BASE_ERRORS.BAD_REQUEST.debug };
    }

    return error;
  }

  static copyFrom(error: Error | Exception) {
    const transactionException = new TransactionException(error);
    if (error instanceof BaseError) {
      transactionException.details = error.getDetails();
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const message = error.details ? error.details.message : error.message || '';

      transactionException.details = {
        message,
      };
    }

    return transactionException;
  }
}

class SomethingWentWrong extends BaseError<null, null> {
  public constructor(details: ErrorDetail) {
    super();
    this.details = details;
  }

  public getError(): Exception {
    let error: Exception = BASE_ERRORS.SOMETHING_WENT_WRONG;
    if (this.details) {
      error = { ...error, details: this.details };
    }
    return error;
  }
}

class ResourceNotFoundError extends BaseError<null, null> {
  public constructor(details: ErrorDetail) {
    super();
    this.details = details;
  }

  public getError(): Exception {
    let error: Exception = BASE_ERRORS.RESOURCE_NOT_FOUND_ERROR;
    if (this.details) {
      error = { ...error, details: this.details };
    } else
      error = {
        ...error,
        details: { message: BASE_ERRORS.RESOURCE_NOT_FOUND_ERROR.debug },
      };
    return error;
  }
}

class ServiceNotAvailableError extends BaseError<null, null> {
  public constructor(details: ErrorDetail) {
    super();
    this.details = details;
  }

  public getError(): Exception {
    let error: Exception = BASE_ERRORS.SERVICE_NOT_AVAILABLE;
    if (this.details) {
      error = { ...error, details: this.details };
    }
    return error;
  }
}

class ResourceDuplicationError extends BaseError<null, null> {
  public constructor(details: ErrorDetail) {
    super();
    this.details = details;
  }

  public getError(): Exception {
    let error: Exception = BASE_ERRORS.RESOURCE_DUPLICATION_ERROR;
    if (this.details) {
      error = { ...error, details: this.details };
    }
    return error;
  }
}

class UnavailableForLegalReasons extends BaseError<null, null> {
  public constructor(details: ErrorDetail) {
    super();
    this.details = details;
  }

  public getError(): Exception {
    let error: Exception = BASE_ERRORS.UNAVAILABLE_FOR_LEGAL_REASONS;
    if (this.details) {
      error = { ...error, details: this.details };
    }
    return error;
  }
}

class BadRequest extends BaseError<null, null> {
  public constructor(details: ErrorDetail) {
    super();
    this.details = details;
  }

  public getError(): Exception {
    let error: Exception = BASE_ERRORS.BAD_REQUEST;
    if (this.details) {
      error = { ...error, details: this.details };
    }
    return error;
  }
}

export {
  BaseError,
  BadRequest,
  InternalServerError,
  RateLimitExceeded,
  InvalidUserCredentials,
  InvalidUserInput,
  RequiredParameterNotProvided,
  UnavailableForLegalReasons,
  ResourceDuplicationError,
  ResourceNotFoundError,
  AuthenticationError,
  AccessDeniedError,
  SequelizeError,
  TransactionException,
  ServiceNotAvailableError,
  SomethingWentWrong,
};
