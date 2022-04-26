import createVanilla from 'zustand/vanilla';
import type { SetState, GetState } from 'zustand/vanilla';
import createReact from 'zustand';
import type { DbIdentifier } from '@ultras/core-api-sdk';
import type {
  StateKeyType,
  StateKeyParamType,
  ParamsType,
  StateGetterCallType,
  StateSetterCallType,
  ExtractActionType,
  ExtractStateType,
  ExtractStateAndActionType,
  ExtractInterceptorType,
  ListStateDataInterface,
  SingleStateDataInterface,
} from './types';

export const defaultLimit = 50;

const fillStateKeys = (keys: Array<StateKeyType>): StateKeyParamType => {
  const includeKeys: StateKeyParamType = {
    list: true,
    single: true,
  };

  if (keys.length != 0) {
    Object.keys(includeKeys).forEach((item: string) => {
      const key = item as StateKeyType;
      if (!keys.includes(key)) {
        includeKeys[key] = false;
      }
    });
  }

  return includeKeys;
};

export const generateCRUD = <
  TData extends object,
  TKey extends StateKeyType = StateKeyType
>(
  params: ParamsType<TData, TKey>
) => {
  // @ts-ignore
  const includeKeys = fillStateKeys(params.keys || []);

  // #region state
  const buildInitialState = (): ExtractStateType<TData, TKey> => {
    // @ts-ignore
    const state: ExtractStateType<TData, TKey> = {};

    if (includeKeys.list) {
      (state as ExtractStateType<TData, 'list'>).list = {
        status: 'loading',
        error: null,
        data: null,
        pagination: {
          total: null,
          limit: 0,
          offset: 0,
        },
      };
    }

    if (includeKeys.single) {
      (state as ExtractStateType<TData, 'single'>).single = {
        status: 'loading',
        error: null,
        data: null,
      };
    }

    return state;
  };
  // #endregion

  // #region actions
  const buildActions = (
    setStateCall: SetState<ExtractStateAndActionType<TData, TKey>>,
    getStateCall: GetState<ExtractStateAndActionType<TData, TKey>>
  ): ExtractActionType<TData, TKey> => {
    // @ts-ignore
    const actions: ExtractActionType<TData, TKey> = {};

    if (includeKeys.list) {
      const getState = getStateCall as unknown as StateGetterCallType<TData, 'list'>;
      const setState = setStateCall as unknown as StateSetterCallType<TData, 'list'>;
      const interceptors = params as unknown as ExtractInterceptorType<TData, 'list'>;

      (actions as ExtractActionType<TData, 'list'>).getAll = async (): Promise<
        ListStateDataInterface<TData>
      > => {
        const list = getState().list;

        const itemsLimit = params.limit || defaultLimit;
        const itemsCount = list.data?.length || 0;

        if (list.pagination.total === itemsCount) {
          return list;
        }

        list.status = 'loading';
        setState({ list });

        try {
          const result = await interceptors.loadAll(itemsLimit, itemsCount);
          if (!result) {
            throw new Error('"loadAll" returned empty result.');
          }

          list.data = (list.data || []).concat(result.body.data);
          list.status = 'success';
          list.pagination.total = result.body.meta.pagination.total;
          list.pagination.offset = result.body.meta.pagination.offset;
          list.pagination.limit = result.body.meta.pagination.limit;
        } catch (e) {
          list.status = 'error';
          list.error = e as Error;
        }

        setState({ list });
        return list;
      };
    }

    if (includeKeys.single) {
      const getState = getStateCall as unknown as StateGetterCallType<TData, 'single'>;
      const setState = setStateCall as unknown as StateSetterCallType<TData, 'single'>;
      const interceptors = params as unknown as ExtractInterceptorType<TData, 'single'>;

      (actions as ExtractActionType<TData, 'single'>).getSingle = async (
        id: DbIdentifier
      ): Promise<SingleStateDataInterface<TData>> => {
        const single = getState().single;
        single.status = 'loading';
        setState({ single });

        try {
          const result = await interceptors.loadSingle(id);
          if (!result) {
            throw new Error('"loadSingle" returned empty result.');
          }

          single.status = 'success';
          single.data = result.body.data;
        } catch (e) {
          single.status = 'error';
          single.error = e as Error;
        }

        setState({ single });
        return single;
      };
    }

    return actions;
  };
  // #endregion

  const storeVanilla = createVanilla<ExtractStateAndActionType<TData, TKey>>(
    (set, get) => ({
      ...buildInitialState(),
      ...buildActions(set, get),
    })
  );

  const storeReact = createReact(storeVanilla);

  const useSelector = (...keys: Array<TKey>) => {
    const state = storeReact() as ExtractStateAndActionType<TData, TKey>;
    if (!keys || keys.length === 0) {
      return state;
    }

    // @ts-ignore
    return keys.reduce<Pick<ExtractStateType<TData, TKey>, typeof keys[number]>>(
      (acc, value: StateKeyType) => {
        // @ts-ignore
        acc[value] = state[value];
        return acc;
      },
      // @ts-ignore
      {} as Pick<ExtractStateType<TData, TKey>, typeof keys[number]>
    );
  };

  // #region actions
  const buildRootActions = () => {
    // @ts-ignore
    const rootActions: ExtractActionType<TData, TKey> = {};

    if (includeKeys.list) {
      (rootActions as ExtractActionType<TData, 'list'>).getAll = () => {
        return (
          storeVanilla.getState() as unknown as ExtractActionType<TData, 'list'>
        ).getAll();
      };
    }

    if (includeKeys.single) {
      (rootActions as ExtractActionType<TData, 'single'>).getSingle = (
        id: DbIdentifier
      ) => {
        return (
          storeVanilla.getState() as unknown as ExtractActionType<TData, 'single'>
        ).getSingle(id);
      };
    }

    return rootActions;
  };
  // #endregion

  return {
    useStore: storeReact,
    useSelector: useSelector,
    // subscribe: storeVanilla.subscribe,
    destroy: storeVanilla.destroy,
    getState: storeVanilla.getState,
    setState: storeVanilla.setState,

    ...buildRootActions(),
  };
};
