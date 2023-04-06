import { create as createStore } from 'zustand';
import buildStateAndActions from './utils/buildStateAndActions';

import type { StateKeyType, ParamsType, ExtractStateAndActionType } from './types';

export const generateCRUD = <
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TFilter,
  TScheme,
  TKey extends StateKeyType = StateKeyType
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
  >
) => {
  const store = createStore<
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
  >((stateSetter, stateGetter) => buildStateAndActions(params, stateSetter, stateGetter));

  const useSelector = <TPassedKeys extends TKey>(...keys: Array<TPassedKeys>) => {
    const state = store() as ExtractStateAndActionType<
      TDataList,
      TDataSingle,
      TDataCreate,
      TDataUpdate,
      TDataDelete,
      TPassedKeys,
      TFilter,
      TScheme
    >;
    if (!keys || keys.length === 0) {
      return state;
    }

    return keys.reduce((acc, value: StateKeyType) => {
      // @ts-ignore
      acc[value] = state[value];
      return acc;
    }, {} as ExtractStateAndActionType<TDataList, TDataSingle, TDataCreate, TDataUpdate, TDataDelete, TPassedKeys, TFilter, TScheme>);
  };

  return {
    useStore: store,
    useSelector: useSelector,
    getState: store.getState,
    setState: store.setState,
  };
};
