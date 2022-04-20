import {
  ApiResponseType,
  DbIdentifier,
  ListResponseMetaType,
} from '@ultras/core-api-sdk';

// #region state
export type StatusType = 'loading' | 'error' | 'success';

export interface ListStateDataInterface<T> {
  status: StatusType;
  error: null | Error;
  data: null | Array<T>;
  pagination: {
    total: null | number;
    limit: number;
    offset: number;
  };
}

export interface SingleStateDataInterface<T> {
  status: StatusType;
  error: null | Error;
  data: null | T;
}

export interface BaseStateDataInterface<T> {
  list: ListStateDataInterface<T>;
  single: SingleStateDataInterface<T>;
}

export type StateKeyType<T> = keyof BaseStateDataInterface<T>;
// #endregion

// #region actions
export interface BaseStateActionInterface<T> {
  getAll(): Promise<ListStateDataInterface<T>>;
  getById(id: DbIdentifier): Promise<SingleStateDataInterface<T>>;
}
// #endregion

// #region actions
export interface BaseStoreInterface<T>
  extends BaseStateDataInterface<T>,
    BaseStateActionInterface<T> {}
// #endregion

// #region callbacks
type GetListPromiseType<T> =
  | undefined
  | Promise<ApiResponseType<Array<T>, ListResponseMetaType>>;

type GetSinglePromiseType<T> = undefined | Promise<ApiResponseType<T>>;

export interface StoreCallbackInterface<T> {
  limit?: number;
  loadAll(limit: number, offset: number): GetListPromiseType<T>;
  loadById(id: DbIdentifier): GetSinglePromiseType<T>;
}
// #endregion
