import createVanilla from 'zustand/vanilla';
import createReact from 'zustand';

import buildStateAndActions from './utils/buildStateAndActions';
import buildRootActions from './utils/buildRootActions';

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
  const storeVanilla = createVanilla<
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

  const storeReact = createReact(storeVanilla);

  const useSelector = <TPassedKeys extends TKey>(...keys: Array<TPassedKeys>) => {
    const state = storeReact() as ExtractStateAndActionType<
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
    useStore: storeReact,
    useSelector: useSelector,
    destroy: storeVanilla.destroy,
    getState: storeVanilla.getState,
    setState: storeVanilla.setState,

    ...buildRootActions(params, storeVanilla),
  };
};
