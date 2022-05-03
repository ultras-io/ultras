import {
  ApiResponseType,
  DbIdentifier,
  ListResponseMetaType,
} from '@ultras/core-api-sdk';

// #region Add/Update field interfaces
export interface SchemeFieldInterface<TFieldValue = string> {
  initialValue?: TFieldValue | null;
  processValue?(valueOriginal: TFieldValue | null): TFieldValue;
  validate?(
    valueOriginal: TFieldValue | null,
    validToSave: TFieldValue | null
  ): Array<string>;
}
export interface SchemeInterface {
  [key: string]: SchemeFieldInterface;
}

export interface StateFieldAddInterface<TFieldValue = string> {
  isValid: boolean;
  valueOriginal: TFieldValue | null;
  valueToSave: TFieldValue | null;
  errors: Array<string>;
}
export interface StateDataAddInterface {
  [key: string]: StateFieldAddInterface;
}
// #endregion

// #region state & global types
// type Subtract<A, C> = A extends C ? never : A;
// type AllKeys<T> = T extends any ? keyof T : never;
// type NonCommonKeys<T extends object> = Subtract<AllKeys<T>, CommonKeys<T>>;
// type CommonKeys<T extends object> = keyof T;

// type PickType<T, K extends AllKeys<T>> = T extends { [k in K]?: any } ? T[K] : undefined;

// type PickTypeOf<T, K extends string | number | symbol> = K extends AllKeys<T>
//   ? PickType<T, K>
//   : never;

// type MergeUnion<T extends object> = {
//   [keys in CommonKeys<T>]: PickTypeOf<T, keys>;
// } & {
//   [keys in NonCommonKeys<T>]: PickTypeOf<T, keys>;
// };

type AllKeys<T> = T extends any ? keyof T : never;
type PickType<T, K extends AllKeys<T>> = NonNullable<
  T extends { [key in K]: any } ? T[K] : null
>;

type PickTypeOf<T, K extends string | number | symbol> = K extends AllKeys<T>
  ? PickType<T, K>
  : PickType<T, AllKeys<T>>;

type MergeUnion<T extends object> = {
  [keys in AllKeys<T>]: PickTypeOf<T, keys>;
};

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

type CreatePromiseType<TData> = undefined | Promise<ApiResponseType<TData>>;

export type StateKeyType = 'list' | 'single' | 'add';
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

export interface AddStateDataInterface<TData> {
  status: StatusType;
  error: null | Error;
  data: null | StateDataAddInterface;
  valid: boolean;
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
  add: {
    add: AddStateDataInterface<TData>;
  };
};

export type GroupedActionType<TData> = {
  list: {
    getAll(): Promise<ListStateDataInterface<TData>>;
  };
  single: {
    getSingle(id: DbIdentifier): Promise<SingleStateDataInterface<TData>>;
  };
  add: {
    setFieldValue<TFieldKey extends keyof TData>(
      fieldKey: TFieldKey,
      fieldValue: TData[TFieldKey]
    ): void;
    create(): Promise<TData | null>;
  };
};

export type GroupedInterceptorType<TData> = {
  list: {
    loadAll(limit: number, offset: number): GetListPromiseType<TData>;
  };
  single: {
    loadSingle(id: DbIdentifier): GetSinglePromiseType<TData>;
  };
  add: {
    scheme: SchemeInterface;
    beforeSend?(data: StateDataAddInterface): Partial<TData> | null;
    create(data: Partial<TData>): CreatePromiseType<TData>;
  };
};

export type ExtractStateType<TData, TStateItem extends StateKeyType> = MergeUnion<
  GroupedStateType<TData>[TStateItem]
>;

export type ExtractActionType<TData, TStateItem extends StateKeyType> = MergeUnion<
  GroupedActionType<TData>[TStateItem]
>;

export type ExtractInterceptorType<TData, TStateItem extends StateKeyType> = MergeUnion<
  GroupedInterceptorType<TData>[TStateItem]
>;

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
