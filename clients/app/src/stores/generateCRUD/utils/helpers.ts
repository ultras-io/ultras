import type { StoreApi } from 'zustand/vanilla';
import { buildObjectHash } from '@ultras/utils';
import type {
  ExtractInterceptorType,
  ExtractStateAndActionType,
  ParamsType,
  StateGetterCallType,
  StateSetterCallType,
  StateFieldSchemeInterface,
  SchemeFieldInterface,
  SchemeInterface,
  StateKeyType,
  StateKeyParamType,
  FullFilterable,
  AddStateDataInterface,
  UpdateStateDataInterface,
} from '../types';

export function fillStateKeys(keys: Array<StateKeyType>): StateKeyParamType {
  const includeKeys: StateKeyParamType = {
    list: true,
    single: true,
    add: true,
    delete: true,
    update: true,
  };

  if (keys.length !== 0) {
    Object.keys(includeKeys).forEach((item: string) => {
      const key = item as StateKeyType;
      if (!keys.includes(key)) {
        includeKeys[key] = false;
      }
    });
  }

  return includeKeys;
}

export function createField<TFieldKey = string>(
  initialValue: TFieldKey | null = null
): StateFieldSchemeInterface<TFieldKey> {
  return {
    isValid: false,
    valueOriginal: initialValue,
    valueToSave: initialValue,
    errors: [],
  };
}

export function processSchemeValueAndValidate<TData, TScheme>(
  store: AddStateDataInterface<TData, TScheme> | UpdateStateDataInterface<TData, TScheme>,
  scheme: undefined | SchemeInterface<TScheme>,
  key: keyof TScheme
) {
  if (typeof scheme === 'undefined' || typeof scheme[key] === 'undefined') {
    return;
  }

  const schemeItem = scheme[key] as SchemeFieldInterface<TScheme[keyof TScheme]>;
  if (!schemeItem) {
    return;
  }

  if (typeof schemeItem.processValue === 'function') {
    store.data![key].valueToSave = schemeItem.processValue(
      store.data![key].valueOriginal
    );
  }

  if (typeof schemeItem.validate === 'function') {
    let errors = schemeItem.validate(
      store.data![key].valueOriginal,
      store.data![key].valueToSave
    );

    if (!errors) {
      errors = [];
    }

    store.data![key].errors = errors;
  }
}

export function buildFilterHash<T>(filter: null | FullFilterable<T>): string {
  if (!filter) {
    return '';
  }

  if (Object.keys(filter).length === 0) {
    return '';
  }

  return buildObjectHash(filter);
}

// make action extractor function.
export function makeActionExtract<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TKey extends StateKeyType,
  TFilter,
  TScheme
>(
  params: ParamsType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TKey,
    TFilter,
    TScheme
  >,
  setStateCall: StoreApi<
    ExtractStateAndActionType<
      TDataList,
      TDataSingle,
      TDataCreate,
      TDataUpdate,
      TDataDelete,
      TKey,
      TFilter,
      TScheme
    >
  >['setState'],
  getStateCall: StoreApi<
    ExtractStateAndActionType<
      TDataList,
      TDataSingle,
      TDataCreate,
      TDataUpdate,
      TDataDelete,
      TKey,
      TFilter,
      TScheme
    >
  >['getState']
) {
  // extract params and make get/set state group based.
  return function <TStateGroup extends StateKeyType>() {
    const getState = getStateCall as StateGetterCallType<
      TDataList,
      TDataSingle,
      TDataCreate,
      TDataUpdate,
      TDataDelete,
      TStateGroup,
      TFilter,
      TScheme
    >;
    const setState = setStateCall as StateSetterCallType<
      TDataList,
      TDataSingle,
      TDataCreate,
      TDataUpdate,
      TDataDelete,
      TStateGroup,
      TFilter,
      TScheme
    >;
    const interceptors = params as ExtractInterceptorType<
      TDataList,
      TDataSingle,
      TDataCreate,
      TDataUpdate,
      TDataDelete,
      TStateGroup,
      TFilter,
      TScheme
    >;

    return { getState, setState, interceptors };
  };
}
