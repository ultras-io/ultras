import { OrderEnum } from '@ultras/utils';

export type QueryParam<T> = T & {
  limit?: number;
  offset?: number;
  order?: OrderEnum;
};
