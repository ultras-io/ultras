/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ListRequestParams } from '@ultras/utils';

interface PossibleMetaInterface {
  access_token?: string;
}

// NOTE: replace with string if UUIDv4 will be used as data identifier.
export type ResourceIdentifier = number;

export type QueryParam<T> = T & ListRequestParams;
export type DynamicQueryParam = Record<string, any>;

export type ListResponseMetaType<T = {}> = T & {
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
};

type ClientErrorStatus =
  | 400 // bad request
  | 401 // unauthorized
  | 403 // forbidden
  | 404 // not found
  | 429 // rate limit exceeded
  | 451; // unavailable for legal reasons

type ServerErrorStatus =
  | 500 // internal server error
  | 503; // service not available

type SuccessStatus =
  | 200 // ok
  | 201 // created
  | 202 // accepted
  | 204; // no content

export interface ErrorResponseInterface {
  success: false;
  status: ClientErrorStatus | ServerErrorStatus;
  error: {
    status: number;
    statusName: string;
    debug: string;
    details: {
      message?: string;
      [key: string]: any;
    };
  };
}

export interface SuccessResponseInterface<TBody = any, TMeta = {}> {
  success: true;
  status: SuccessStatus;
  data: TBody;
  meta: TMeta & PossibleMetaInterface;
}

export type ApiResponseBodyType<TBody = any, TMeta = {}> =
  | ErrorResponseInterface
  | SuccessResponseInterface<TBody, TMeta>;

export type ApiResponseType<TBody = any, TMeta = any, THead = any> = {
  headers: THead;
  body: ApiResponseBodyType<TBody, TMeta>;
};

export type MultiResourceIdentifier = ResourceIdentifier | Array<ResourceIdentifier>;
