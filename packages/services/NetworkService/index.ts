/* eslint-disable no-async-promise-executor */

import {
  HttpRequestMethods,
  HttpErrorMessages,
  Interceptor,
  RequestOptions,
  RequestInit,
} from './types';

import exceptionDetector from './interceptors/exceptionDetector';

import 'isomorphic-fetch';

interface IRequestResult {
  headers?: any;
  json?: any;
  status?: any;
}

export type ResponseBodyType<TBody> = TBody & {
  status?: number;
  success?: boolean;
};

export interface IResponse<TBody = any, THeaders = any> {
  headers: THeaders;
  body: ResponseBodyType<TBody>;
}

class NetworkService {
  private readonly interceptors: Interceptor[] = [exceptionDetector];

  constructor(private readonly uri: string, interceptors: Array<Interceptor> = []) {
    if (!this.uri || typeof this.uri !== 'string') {
      throw new Error('The "uri" argument must be string.');
    }

    if (interceptors.length) {
      interceptors.forEach((interceptor: Interceptor) => {
        if (
          !interceptor ||
          (typeof interceptor.request !== 'function' &&
            typeof interceptor.response !== 'function')
        ) {
          throw new Error(`The '${interceptor}' is not a valid interceptor.`);
        }

        this.interceptors.push(interceptor);
      });
    }
  }

  clearAuthenticatedState = () => {
    // CacheService.clearStorage();
  };

  makeAPIGetRequest = <TBody = any, THeaders = any>(
    url: string,
    options: RequestOptions = {}
  ) => {
    options = options || {};
    options.method = HttpRequestMethods.GET;
    return this.makeAPIRequest<TBody, THeaders>(url, options);
  };

  makeAPIPostRequest = <TBody = any, THeaders = any>(
    url: string,
    options: RequestOptions = {}
  ) => {
    options.method = HttpRequestMethods.POST;
    return this.makeAPIRequest<TBody, THeaders>(url, options);
  };

  makeAPIPutRequest = <TBody = any, THeaders = any>(
    urlPrefix: string,
    options: RequestOptions = {}
  ) => {
    options.method = HttpRequestMethods.PUT;
    return this.makeAPIRequest<TBody, THeaders>(urlPrefix, options);
  };

  makeAPIDeleteRequest = <TBody = any, THeaders = any>(
    urlPrefix: string,
    options: RequestOptions = {}
  ) => {
    options.method = HttpRequestMethods.DELETE;
    return this.makeAPIRequest<TBody, THeaders>(urlPrefix, options);
  };

  makeAPIPatchRequest = <TBody = any, THeaders = any>(
    urlPrefix: string,
    options: RequestOptions = {}
  ) => {
    options.method = HttpRequestMethods.PATCH;
    return this.makeAPIRequest<TBody, THeaders>(urlPrefix, options);
  };

  createUrl = (arg: string | Array<string>) => {
    let endpoint = '';
    if (Array.isArray(arg)) {
      // join arguments via slash
      endpoint = arg.join('/');
    } else {
      // remove first slash
      endpoint = arg.replace(/^\//, '');
    }

    if (!endpoint) {
      return this.uri;
    }

    endpoint = this.sanitizeUrl(endpoint)
      .split('/')
      .filter((segment: string) => segment.length > 0)
      .join('/');

    return `${this.uri}/${endpoint}`;
  };

  sanitizeUrl = (url: string): string => {
    // remove last slash from pathname with steps:
    //   1) split the pathname and query string
    //   2) remove last slash of pathname
    //   3) join sanitized pathname and query string
    if (typeof url === 'string') {
      const segments = url.split('?');
      if (segments.length > 0) {
        if (segments[0].endsWith('/')) {
          segments[0] = segments[0].substring(0, segments[0].length - 1);
        }
      }

      url = segments.join('?');
    }

    return url;
  };

  createQueryParams = (queryParams: Record<string, unknown>) => {
    return Object.keys(queryParams)
      .reduce((accumulator: Array<string>, key: string) => {
        const item = queryParams[key];

        // empty string or null must be sent to server with no value
        // only undefined value must be ignored.
        if (typeof item === 'undefined') {
          return accumulator;
        }

        if (Array.isArray(item)) {
          for (let index = 0; index < item.length; index++) {
            const arrItem = item[index];
            accumulator.push(`${key}=${arrItem}`);
          }
        } else {
          accumulator.push(`${key}=${item}`);
        }

        return accumulator;
      }, [])
      .join('&');
  };

  makeAPIRequest = <TBody = any, THeaders = any>(
    partUrl: string,
    options: RequestOptions = {}
  ): Promise<IResponse<TBody, THeaders>> => {
    return new Promise(async (resolve, reject) => {
      let url = this.createUrl(partUrl);

      if (this.interceptors.length) {
        for (const interceptor of this.interceptors) {
          if (interceptor && typeof interceptor.request === 'function') {
            const result = await interceptor.request({ url, options });
            if (result) {
              url = result.url;
              options = result.options;
            }
          }
        }
      }

      this.request(url, options)
        .then(async (response: IRequestResult) => {
          if (!response) {
            return reject({
              message: HttpErrorMessages.INVALID_RESPONSE_DATA,
            });
          }

          let { headers } = response;
          let body = {
            status: 0,
          } as ResponseBodyType<TBody>;

          const contentType = headers.get('content-type');

          if (contentType && contentType.indexOf('application/json') !== -1) {
            body = await response.json();
          }

          body.status = response.status;
          body.success = response.status < 400;

          try {
            if (this.interceptors.length) {
              for (const interceptor of this.interceptors) {
                if (interceptor && typeof interceptor.response === 'function') {
                  const result = await interceptor.response({ body, headers });
                  if (result) {
                    body = result.body;
                    headers = result.headers;
                  }
                }
              }
            }
          } catch (e: any) {
            reject({
              message: e.message,
              res: {
                body,
                headers,
              },
            });
          }

          if (response.status > 400) {
            return reject(body);
          }

          return resolve({
            body,
            headers,
          });
        })
        .catch((err: any) => reject(err));
    });
  };

  request = (url: string, options: RequestOptions = {}) => {
    return new Promise<any>((resolve, reject) => {
      if (!url) {
        return reject(HttpErrorMessages.INVALID_REQUEST_PARAMS);
      }

      if (options.query_params) {
        const queryParams = this.createQueryParams(options.query_params);

        if (queryParams) {
          const isContainsQuestionMark = url.includes('?');
          const isUrlEndsWithSlash = url.endsWith('/');

          if (!isContainsQuestionMark && isUrlEndsWithSlash) {
            url = url.substring(0, url.length - 1);
          }

          const paramGlue = isContainsQuestionMark ? '&' : '?';
          url += `${paramGlue}${queryParams}`;
        }
      }

      if (!options.method) {
        options.method = HttpRequestMethods.GET;
      }

      const fetchOptions: RequestInit = {
        method: options.method,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      };

      if (options.headers && typeof options.headers === 'object') {
        fetchOptions.headers = {
          ...fetchOptions.headers,
          ...options.headers,
        };
      }

      try {
        if (options.body) {
          if (options.body instanceof File || options.jsonBody === false) {
            fetchOptions.body = options.body;
          } else {
            fetchOptions.body = JSON.stringify(options.body);

            fetchOptions.headers = {
              ...fetchOptions.headers,
              'Content-Type': 'application/json',
              Accepts: 'application/json',
            };
          }
        }
      } catch (ex) {
        return reject({
          message: HttpErrorMessages.INVALID_REQUEST_PARAMS,
        });
      }

      url = this.sanitizeUrl(url);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fetch(url, fetchOptions)
        .then((response: Response) => resolve(response))
        .catch((error: Error) => reject(error));
    });
  };
}

export default NetworkService;
