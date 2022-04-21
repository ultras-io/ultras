import {
  ApiResponseType,
  DbIdentifier,
  ListResponseMetaType,
} from '@ultras/core-api-sdk';

// #region state & global types
type IfEquals<T, U, Y = unknown, N = never> = (<G>() => G extends T ? 1 : 2) extends <
  G
>() => G extends U ? 1 : 2
  ? Y
  : N;

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
export type TGroupedState<TData> = {
  list: {
    list: ListStateDataInterface<TData>;
  };
  single: {
    single: SingleStateDataInterface<TData>;
  };
};

export type TGroupedAction<TData> = {
  list: {
    getAll(): Promise<ListStateDataInterface<TData>>;
  };
  single: {
    getById(id: DbIdentifier): Promise<SingleStateDataInterface<TData>>;
  };
};

export type TGroupedCallback<TData> = {
  list: {
    loadAll(limit: number, offset: number): GetListPromiseType<TData>;
  };
  single: {
    loadById(id: DbIdentifier): GetSinglePromiseType<TData>;
  };
};

export type TExtractState<TData, TStateItem extends StateKeyType> = Pick<
  TGroupedState<TData>,
  TStateItem
>[TStateItem];

export type TExtractAction<TData, TStateItem extends StateKeyType> = Pick<
  TGroupedAction<TData>,
  TStateItem
>[TStateItem];

export type TExtractCallback<TData, TStateItem extends StateKeyType> = Pick<
  TGroupedCallback<TData>,
  TStateItem
>[TStateItem];

export type TExtractStateAndActions<
  TData,
  TStateItem extends StateKeyType
> = TExtractState<TData, TStateItem> & TExtractAction<TData, TStateItem>;
// #endregion

// #region
export type ParamsType<TData, TStateItem extends StateKeyType> = {
  limit?: number;
} & TExtractCallback<TData, TStateItem> &
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

export type StateGetterCallType<TData, TKey extends StateKeyType> = () => TExtractState<
  TData,
  TKey
>;

export type StateSetterCallType<TData, TKey extends StateKeyType> = (
  args: TExtractState<TData, TKey>
) => void;
// #endregion

// export interface BaseStateDataInterface<TData> {
//   list: ListStateDataInterface<TData>;
//   single: SingleStateDataInterface<TData>;
// }

// export type StateKeyType<TData> = keyof BaseStateDataInterface<TData>;
// export type StateKeyParamType<TData> = Record<StateKeyType<TData>, boolean>;
// export type WithKeysDataType<TData, TStateItem extends StateKeyType<TData>> = {
//   [key in TStateItem]: BaseStateDataInterface<TData>[key];
// };
// #endregion

// // #region types
// export interface BaseStateActionInterface<TData> {
//   getAll(): Promise<ListStateDataInterface<TData>>;
//   getById(id: DbIdentifier): Promise<SingleStateDataInterface<TData>>;
// }

// export type ActionKeyType<TData> = keyof BaseStateActionInterface<TData>;
// export type ActionKeyParamType<TData> = Record<ActionKeyType<TData>, boolean>;
// export type WithKeysActionType<TData, TActionItem extends ActionKeyType<TData>> = {
//   [key in TActionItem]: BaseStateActionInterface<TData>[key];
// };

// // #endregion

// // #region actions
// export type BaseStoreInterface<
//   TData,
//   TStateItem extends StateKeyType<TData>,
//   TActionItem extends ActionKeyType<TData>
// > = WithKeysDataType<TData, TStateItem> & WithKeysActionType<TData, TActionItem>;
// // #endregion

// // #region callbacks
// type GetListPromiseType<TData> =
//   | undefined
//   | Promise<ApiResponseType<Array<TData>, ListResponseMetaType>>;

// type GetSinglePromiseType<TData> = undefined | Promise<ApiResponseType<TData>>;

// export type StoreCallbackInterface<TData, TStateItem extends StateKeyType<TData>> = {
//   limit?: number;
//   keys?: Array<TStateItem>;
// } & TExtractCallback<TData, TStateItem>;
// // #endregion
