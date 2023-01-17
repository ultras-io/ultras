import type { StoreApi } from 'zustand/vanilla';
import { buildObjectHash } from '@ultras/utils';
import type {
  ExtractInterceptorType,
  ExtractStateAndActionType,
  ParamsType,
  StateGetterCallType,
  StateSetterCallType,
  ISchemeField,
  IScheme,
  IStateFieldScheme,
  StateKeyType,
  StateKeyParamType,
  FullFilterable,
  IAddStateData,
  IUpdateStateData,
  IStateDataScheme,
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
): IStateFieldScheme<TFieldKey> {
  return {
    isValid: false,
    valueOriginal: initialValue,
    valueToSave: initialValue,
    errors: [],
  };
}

export function processSchemeValueAndValidate<TScheme>(
  store: IAddStateData<TScheme> | IUpdateStateData<TScheme>,
  scheme: undefined | IScheme<TScheme>,
  key: keyof TScheme
) {
  store.data![key].isValid = true;
  if (typeof scheme === 'undefined' || typeof scheme[key] === 'undefined') {
    return;
  }

  const schemeItem = scheme[key] as ISchemeField<
    TScheme[keyof TScheme],
    IStateDataScheme<TScheme>
  >;
  if (!schemeItem) {
    return;
  }

  if (typeof schemeItem.processValue === 'function') {
    store.data![key].valueToSave = schemeItem.processValue({
      valueOriginal: store.data![key].valueOriginal,
      storeState: store.data!,
    });
  }

  let errors: Array<string> = [];
  if (typeof schemeItem.validate === 'function') {
    errors = schemeItem.validate({
      valueOriginal: store.data![key].valueOriginal,
      valueToSave: store.data![key].valueToSave,
      storeState: store.data!,
    });
  }

  if (!errors) {
    errors = [];
  }

  store.data![key].errors = errors;
  store.data![key].isValid = errors.length === 0;
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

export function initializeSchemeValue<TScheme>(
  scheme: IScheme<TScheme>,
  initialData: IAddStateData<TScheme> | IUpdateStateData<TScheme>
) {
  Object.keys(scheme).forEach((keyName: string) => {
    const key = keyName as keyof TScheme;

    const initiateSchemeValue = scheme[key].initialValue;
    let initialValue: any = null;

    if (typeof initiateSchemeValue !== 'undefined') {
      if (typeof initiateSchemeValue === 'function') {
        // @ts-ignore
        initialValue = initiateSchemeValue();
      } else {
        initialValue = initiateSchemeValue;
      }
    }

    const field = createField(initialValue);
    initialData.data![key] = field;
  });

  Object.keys(scheme).forEach((keyName: string) => {
    processSchemeValueAndValidate<TScheme>(initialData, scheme, keyName as keyof TScheme);
  });
}
