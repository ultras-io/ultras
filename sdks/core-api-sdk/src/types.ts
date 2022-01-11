import { ListRequestParams } from '@ultras/utils';

export type QueryParam<T> = T & ListRequestParams;
export type DynamicQueryParam = Record<string, unknown>;
