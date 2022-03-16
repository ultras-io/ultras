import { ListRequestParams } from '@ultras/utils';

// NOTE: replace with string if UUIDv4 will be used as data identifier.
export type DbIdentifier = number;

export type QueryParam<T> = T & ListRequestParams;
export type DynamicQueryParam = Record<string, any>;

export type ListResponseMetaType<T = any> = T & {
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
};

interface PossibleMetaInterface {
  access_token: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type ApiResponseBodyType<TBody = any, TMeta = any> = {
  status: number;
  data: TBody;
  meta: TMeta & PossibleMetaInterface;
};

export type ApiResponseType<TBody = any, TMeta = any, THead = any> = {
  headers: THead;
  body: ApiResponseBodyType<TBody, TMeta>;
};
