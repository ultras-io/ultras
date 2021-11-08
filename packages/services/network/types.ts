export type Interceptor = <T>(data: T, headers?: Object) => T;

export enum HttpRequestMethods {
  GET = 'GET',
  PUT = 'PUT',
  HEAD = 'HEAD',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTION = 'OPTION',
}

export enum HttpErrorMessages {
  INVALID_REQUEST_PARAMS = 'Invalid request parameters.',
  INVALID_RESPONSE_DATA = 'Invalid Response Data',
  SERVER_IS_UNAVAILABLE = 'The server is unavailable.',
  RESPONSE_PARSING_ERROR = 'Unable to parse response.',
}

export type RequestOptions = {
  method?: HttpRequestMethods;
  query_params?: {};
  headers?: {};
  body?: {
    status: number;
  };
};
