import {
  HttpRequestMethods,
  HttpErrorMessages,
  Interceptor,
  RequestOptions,
  RequestInit,
} from './types';

import exceptionDetector from './interceptors/exceptionDetector';

import 'isomorphic-fetch';

class NetworkService {
  private interceptors: Interceptor[] = [exceptionDetector];
  private uri?: string;

  constructor(uri: string, interceptors = []) {
    if (!uri || typeof uri !== 'string') {
      throw new Error('The "uri" argument must be string.');
    }

    if (interceptors.length) {
      interceptors.forEach((interceptor: Interceptor) => {
        if (typeof interceptor !== 'function') {
          throw new Error(`The '${interceptor}' is not a function.`);
        }
        this.interceptors.push(interceptor);
      });
    }

    this.uri = uri;
  }

  clearAuthenticatedState = () => {
    // CacheService.clearStorage();
  };

  makeAPIGetRequest = (url: string, options: RequestOptions = {}) => {
    options = options || {};
    options.method = HttpRequestMethods.GET;
    return this.makeAPIRequest(url, options);
  };

  makeAPIPostRequest = (url: string, options: RequestOptions = {}) => {
    options.method = HttpRequestMethods.POST;
    return this.makeAPIRequest(url, options);
  };

  makeAPIPutRequest = (urlPrefix: string, options: RequestOptions = {}) => {
    options.method = HttpRequestMethods.PUT;
    return this.makeAPIRequest(urlPrefix, options);
  };

  makeAPIDeleteRequest = (urlPrefix: string, options: RequestOptions = {}) => {
    options.method = HttpRequestMethods.DELETE;
    return this.makeAPIRequest(urlPrefix, options);
  };

  makeAPIPatchRequest = (urlPrefix: string, options: RequestOptions = {}) => {
    options.method = HttpRequestMethods.PATCH;
    return this.makeAPIRequest(urlPrefix, options);
  };

  createUrl = (arg: string) => {
    if (Array.isArray(arg)) {
      return [this.uri, ...arg].join('/');
    }
    return `${this.uri}/${arg}`;
  };

  createQueryParams = (queryParams: Record<string, unknown>) =>
    Object.keys(queryParams).reduce((accumulator, key) => {
      const item = queryParams[key];
      if (item === null || item === undefined) return accumulator;

      if (Array.isArray(item)) {
        for (let index = 0; index < item.length; index++) {
          const arrItem = item[index];
          accumulator += `${key}=${arrItem}&`;
        }
      } else {
        accumulator += `${key}=${item}&`;
      }
      return accumulator;
    }, '');

  makeAPIRequest = (
    partUrl: string,
    options: RequestOptions = {}
  ): Promise<{ body: any; headers: any }> =>
    new Promise((resolve, reject) => {
      let url = this.createUrl(partUrl);

      if (!url) {
        return reject(HttpErrorMessages.INVALID_REQUEST_PARAMS);
      }

      if (options.query_params) {
        url += `?${this.createQueryParams(options.query_params)}`;
      }
      if (!options.method) {
        options.method = HttpRequestMethods.GET;
      }

      // const auth_token = CacheService.getItem('auth_token');
      const fetch_options: RequestInit = {
        method: options.method,
        headers: options.headers || {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // Authorization: auth_token ? `Bearer ${auth_token}` : null,
        },
      };

      if (options.headers) {
        fetch_options.headers = options.headers;
      }
      try {
        if (options.body) {
          fetch_options.body = JSON.stringify(options.body);
        }
      } catch (ex) {
        return reject({ message: HttpErrorMessages.INVALID_REQUEST_PARAMS });
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fetch(url, fetch_options)
        .then(async (response: { json?: any; status?: any; headers?: any }) => {
          if (!response) {
            return reject({
              message: HttpErrorMessages.INVALID_RESPONSE_DATA,
            });
          }

          const { headers } = response;
          let body: { status?: number } = {};

          const contentType = headers.get('content-type');

          if (contentType && contentType.indexOf('application/json') !== -1) {
            body = await response.json();
          }

          body.status = response.status;

          try {
            if (this.interceptors.length) {
              this.interceptors.forEach(interceptor => {
                if (typeof interceptor === 'function') {
                  body = interceptor(body, headers);
                }
              });
            }
          } catch (e: any) {
            reject({ message: e.message, res: { body, headers } });
          }

          if (response.status > 400) {
            return reject(body);
          }

          return resolve({ body, headers });
        })
        .catch((err: any) => reject(err));
    });
}

export default NetworkService;
