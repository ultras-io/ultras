import createVanilla from 'zustand/vanilla';
import createReact from 'zustand';

import buildStateAndActions from './utils/buildStateAndActions';
import buildRootActions from './utils/buildRootActions';

import type { StateKeyType, ParamsType, ExtractStateAndActionType } from './types';

export const generateCRUD = <
  TDataViewModel,
  TDataCreate,
  TDataUpdate,
  TFilter,
  TKey extends StateKeyType = StateKeyType
>(
  params: ParamsType<TDataViewModel, TDataCreate, TDataUpdate, TKey, TFilter>
) => {
  const storeVanilla = createVanilla<
    ExtractStateAndActionType<TDataViewModel, TDataCreate, TDataUpdate, TKey, TFilter>
  >((stateSetter, stateGetter) => buildStateAndActions(params, stateSetter, stateGetter));

  const storeReact = createReact(storeVanilla);

  const useSelector = <TPassedKeys extends TKey>(...keys: Array<TPassedKeys>) => {
    const state = storeReact() as ExtractStateAndActionType<
      TDataViewModel,
      TDataCreate,
      TDataUpdate,
      TPassedKeys,
      TFilter
    >;
    if (!keys || keys.length === 0) {
      return state;
    }

    return keys.reduce((acc, value: StateKeyType) => {
      // @ts-ignore
      acc[value] = state[value];
      return acc;
    }, {} as ExtractStateAndActionType<TDataViewModel, TDataCreate, TDataUpdate, TPassedKeys, TFilter>);
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
