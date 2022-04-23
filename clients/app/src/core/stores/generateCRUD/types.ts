import {
  ApiResponseType,
  DbIdentifier,
  ListResponseMetaType,
} from '@ultras/core-api-sdk';

// #region state & global types
type IfEquals<
  TypeCheckFirst,
  TypeCheckSecond,
  TypeResultYes = unknown,
  TypeResultNo = never
> = (<G>() => G extends TypeCheckFirst ? 1 : 2) extends <T>() => T extends TypeCheckSecond
  ? 1
  : 2
  ? TypeResultYes
  : TypeResultNo;

type GetListPromiseType<TData> =
  | undefined
  | Promise<ApiResponseType<Array<TData>, ListResponseMetaType>>;

type GetSinglePromiseType<TData> = undefined | Promise<ApiResponseType<TData>>;

export type StateKeyType = 'list' | 'single';
export type StateKeyParamType = Record<StateKeyType, boolean>;

export type StatusType = 'loading' | 'error' | 'success';

export interface ListStateDataInterface<TData> {
  status: StatusType;
  error: null | Error;
  data: null | Array<TData>;
  pagination: {
    total: null | number;
    limit: number;
    offset: number;
  };
}

export interface SingleStateDataInterface<TData> {
  status: StatusType;
  error: null | Error;
  data: null | TData;
}
// #endregion

// #region extractor types
export type GroupedStateType<TData> = {
  list: {
    list: ListStateDataInterface<TData>;
  };
  single: {
    single: SingleStateDataInterface<TData>;
  };
};

export type GroupedActionType<TData> = {
  list: {
    getAll(): Promise<ListStateDataInterface<TData>>;
  };
  single: {
    getSingle(id: DbIdentifier): Promise<SingleStateDataInterface<TData>>;
  };
};

export type GroupedInterceptorType<TData> = {
  list: {
    loadAll(limit: number, offset: number): GetListPromiseType<TData>;
  };
  single: {
    loadSingle(id: DbIdentifier): GetSinglePromiseType<TData>;
  };
};

export type ExtractStateType<TData, TStateItem extends StateKeyType> = Pick<
  GroupedStateType<TData>,
  TStateItem
>[TStateItem];

export type ExtractActionType<TData, TStateItem extends StateKeyType> = Pick<
  GroupedActionType<TData>,
  TStateItem
>[TStateItem];

export type ExtractInterceptorType<TData, TStateItem extends StateKeyType> = Pick<
  GroupedInterceptorType<TData>,
  TStateItem
>[TStateItem];

export type ExtractStateAndActionType<
  TData,
  TStateItem extends StateKeyType
> = ExtractStateType<TData, TStateItem> & ExtractActionType<TData, TStateItem>;
// #endregion

// #region
export type ParamsType<TData, TStateItem extends StateKeyType> = {
  limit?: number;
} & ExtractInterceptorType<TData, TStateItem> &
  IfEquals<
    TStateItem,
    StateKeyType,
    {
      keys?: Array<StateKeyType>;
    },
    {
      keys: Array<TStateItem>;
    }
  >;

export type StateGetterCallType<
  TData,
  TKey extends StateKeyType
> = () => ExtractStateType<TData, TKey>;

export type StateSetterCallType<TData, TKey extends StateKeyType> = (
  args: ExtractStateType<TData, TKey>
) => void;
// #endregion
