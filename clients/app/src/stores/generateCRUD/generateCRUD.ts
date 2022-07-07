import createVanilla from 'zustand/vanilla';
import createReact from 'zustand';

import buildStateAndActions from './utils/buildStateAndActions';
import buildRootActions from './utils/buildRootActions';

import type { StateKeyType, ParamsType, ExtractStateAndActionType } from './types';
import buildUseSelector from './hooks/useSelector';

export const generateCRUD = <
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TFilter,
  TKey extends StateKeyType = StateKeyType
>(
  params: ParamsType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TKey,
    TFilter
  >
) => {
  type StateTypeAlias = ExtractStateAndActionType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TKey,
    TFilter
  >;

  const storeVanilla = createVanilla<StateTypeAlias>((stateSetter, stateGetter) => {
    return buildStateAndActions(params, stateSetter, stateGetter);
  });

  const useReactStore = createReact(storeVanilla);

  const useSelector = buildUseSelector<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TKey,
    TFilter
  >(useReactStore);

  // const useSelector = <TPassedKeys extends TKey>(...keys: Array<TPassedKeys>) => {
  //   const state = useReactStore() as ExtractStateAndActionType<
  //     TDataList,
  //     TDataSingle,
  //     TDataCreate,
  //     TDataUpdate,
  //     TDataDelete,
  //     TPassedKeys,
  //     TFilter
  //   >;
  //   if (!keys || keys.length === 0) {
  //     return state;
  //   }

  //   return keys.reduce((acc, value: StateKeyType) => {
  //     // @ts-ignore
  //     acc[value] = state[value];
  //     return acc;
  //   }, {} as ExtractStateAndActionType<TDataList, TDataSingle, TDataCreate, TDataUpdate, TDataDelete, TPassedKeys, TFilter>);
  // };

  return {
    useStore: useReactStore,
    useSelector: useSelector,
    destroy: storeVanilla.destroy,
    getState: storeVanilla.getState,
    setState: storeVanilla.setState,

    ...buildRootActions(params, storeVanilla),
  };
};
