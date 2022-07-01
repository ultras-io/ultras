import createVanilla from 'zustand/vanilla';
import createReact from 'zustand';

import buildStateAndActions from './utils/buildStateAndActions';
import buildRootActions from './utils/buildRootActions';

import type { StateKeyType, ParamsType, ExtractStateAndActionType } from './types';

export const generateCRUD = <
  TData extends object,
  TFilter,
  TKey extends StateKeyType = StateKeyType
>(
  params: ParamsType<TData, TKey, TFilter>
) => {
  const storeVanilla = createVanilla<ExtractStateAndActionType<TData, TKey, TFilter>>(
    (stateSetter, stateGetter) => buildStateAndActions(params, stateSetter, stateGetter)
  );

  const storeReact = createReact(storeVanilla);

  const useSelector = <TPassedKeys extends TKey>(...keys: Array<TPassedKeys>) => {
    const state = storeReact() as ExtractStateAndActionType<TData, TPassedKeys, TFilter>;
    if (!keys || keys.length === 0) {
      return state;
    }

    return keys.reduce((acc, value: StateKeyType) => {
      // @ts-ignore
      acc[value] = state[value];
      return acc;
    }, {} as ExtractStateAndActionType<TData, TPassedKeys, TFilter>);
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
