import type { StoreApi, UseBoundStore } from "zustand";
import type { ExtractStateAndActionType, StateKeyType } from "../types";

type UseReactStoreType<TState extends object = {}> = UseBoundStore<
  TState,
  StoreApi<TState>
>;

type UseStoreType<
TDataList,
TDataSingle,
TDataCreate,
TDataUpdate,
TDataDelete,
TKey extends StateKeyType,
TFilter
> = UseReactStoreType<
ExtractStateAndActionType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TKey,
  TFilter
>
>;

function buildUseSelector<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TKey extends StateKeyType,
  TFilter
>(
  useStore: UseStoreType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TKey,
    TFilter
  >
) {
  type StateTypeAlias<KeyType extends StateKeyType> = ExtractStateAndActionType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    KeyType,
    TFilter
  >;

  type TCurrentState = StateTypeAlias<TKey>;

  const useZustandReactStore =
    useStore as unknown as UseReactStoreType<TCurrentState>;

  return function <TPassedKeys extends TKey>(...keys: Array<TPassedKeys>) {
    type TSelectedState = StateTypeAlias<TPassedKeys>;

    return useZustandReactStore((state: TCurrentState) => {
      return keys.reduce((acc: TSelectedState, value: StateKeyType) => {
        // @ts-ignore
        acc[value] = state[value];
        return acc;
      }, {} as TSelectedState);
    });
  };
}

export default buildUseSelector;
