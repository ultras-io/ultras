import type { SetState, GetState } from 'zustand/vanilla';
import { buildObjectHash } from '@ultras/utils';
import type {
  ExtractInterceptorType,
  ExtractStateAndActionType,
  ParamsType,
  StateGetterCallType,
  StateSetterCallType,
  StateFieldSchemeInterface,
  StateKeyType,
  StateKeyParamType,
  FullFilterable,
} from '../types';

export function fillStateKeys(keys: Array<StateKeyType>): StateKeyParamType {
  const includeKeys: StateKeyParamType = {
    list: true,
    single: true,
    add: true,
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
  TDataViewModel,
  TDataCreate,
  TDataUpdate,
  TKey extends StateKeyType,
  TFilter
>(
  params: ParamsType<TDataViewModel, TDataCreate, TDataUpdate, TKey, TFilter>,
  setStateCall: SetState<
    ExtractStateAndActionType<TDataViewModel, TDataCreate, TDataUpdate, TKey, TFilter>
  >,
  getStateCall: GetState<
    ExtractStateAndActionType<TDataViewModel, TDataCreate, TDataUpdate, TKey, TFilter>
  >
) {
  // extract params and make get/set state group based.
  return function <TStateGroup extends StateKeyType>() {
    const getState = getStateCall as StateGetterCallType<
      TDataViewModel,
      TDataCreate,
      TDataUpdate,
      TStateGroup,
      TFilter
    >;
    const setState = setStateCall as StateSetterCallType<
      TDataViewModel,
      TDataCreate,
      TDataUpdate,
      TStateGroup,
      TFilter
    >;
    const interceptors = params as ExtractInterceptorType<
      TDataViewModel,
      TDataCreate,
      TDataUpdate,
      TStateGroup,
      TFilter
    >;

    return { getState, setState, interceptors };
  };
}
