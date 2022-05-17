import { ListRequestParams } from '@ultras/utils';
import {
  ApiResponseType,
  ResourceIdentifier,
  ListResponseMetaType,
} from '@ultras/core-api-sdk';

// #region Add/Update field interfaces
export interface SchemeFieldInterface<TFieldValue = string> {
  initialValue?: TFieldValue | null;
  processValue?(valueOriginal: TFieldValue | null): TFieldValue;
  validate?(
    valueOriginal: TFieldValue | null,
    valueToSave: TFieldValue | null
  ): Array<string>;
}
export interface SchemeInterface {
  [key: string]: SchemeFieldInterface;
}
export interface BeforeSendInterface<TData> {
  (data: StateDataAddInterface): Partial<TData> | null;
}

export interface InitStoreParamsInterface<TData> {
  scheme: SchemeInterface;
  beforeSend: BeforeSendInterface<TData>;
}

export type FullFilterable<TFilter> = TFilter & ListRequestParams;
export type Filterable<TFilter> = Omit<FullFilterable<TFilter>, 'limit' | 'offset'>;

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

export interface ListStateDataInterface<TData, TFilter> {
  status: StatusType;
  error: null | Error;
  data: null | Array<TData>;
  filter: null | Partial<Filterable<TFilter>>;
  filterHash: null | string;
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
export type GroupedStateType<TData, TFilter> = {
  list: {
    list: ListStateDataInterface<TData, TFilter>;
  };
  single: {
    single: SingleStateDataInterface<TData>;
  };
  add: {
    add: AddStateDataInterface<TData>;
  };
};

export type GroupedActionType<TData, TFilter> = {
  list: {
    getAll(): Promise<ListStateDataInterface<TData, TFilter>>;
    updateFilter(filter: Partial<TFilter>): void;
  };
  single: {
    getSingle(id: ResourceIdentifier): Promise<SingleStateDataInterface<TData>>;
  };
  add: {
    setFieldValue<TFieldKey extends keyof TData>(
      fieldKey: TFieldKey,
      fieldValue: TData[TFieldKey]
    ): void;
    create(): Promise<TData | null>;
  };
};

export type GroupedInterceptorType<TData, TFilter> = {
  list: {
    loadAll(filter: FullFilterable<Partial<TFilter>>): GetListPromiseType<TData>;
  };
  single: {
    loadSingle(id: ResourceIdentifier): GetSinglePromiseType<TData>;
  };
  add: {
    scheme: SchemeInterface;
    beforeSend: BeforeSendInterface<TData> | null;
    create(data: Partial<TData>): CreatePromiseType<TData>;
  };
};

export type ExtractStateType<
  TData,
  TStateItem extends StateKeyType,
  TFilter
> = MergeUnion<GroupedStateType<TData, TFilter>[TStateItem]>;

export type ExtractActionType<
  TData,
  TStateItem extends StateKeyType,
  TFilter
> = MergeUnion<GroupedActionType<TData, TFilter>[TStateItem]>;

export type ExtractInterceptorType<
  TData,
  TStateItem extends StateKeyType,
  TFilter
> = MergeUnion<GroupedInterceptorType<TData, TFilter>[TStateItem]>;

export type ExtractStateAndActionType<
  TData,
  TStateItem extends StateKeyType,
  TFilter
> = ExtractStateType<TData, TStateItem, TFilter> &
  ExtractActionType<TData, TStateItem, TFilter>;
// #endregion

// #region
export type ParamsType<TData, TStateItem extends StateKeyType, TFilter> = {
  limit?: number;
} & ExtractInterceptorType<TData, TStateItem, TFilter> &
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
  TKey extends StateKeyType,
  TFilter
> = () => ExtractStateType<TData, TKey, TFilter>;

export type StateSetterCallType<TData, TKey extends StateKeyType, TFilter> = (
  args: ExtractStateType<TData, TKey, TFilter>
) => void;
// #endregion
