import { ListRequestParams } from '@ultras/utils';

// NOTE: replace with string if UUIDv4 will be used as data identifier.
export type DbIdentifier = number;

export type QueryParam<T> = T & ListRequestParams;
export type DynamicQueryParam = Record<string, any>;
