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
  TExtractAction,
  TExtractState,
  TExtractStateAndActions,
  TExtractCallback,
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
  const buildInitialState = (): TExtractState<TData, TKey> => {
    // @ts-ignore
    const state: TExtractState<TData, TKey> = {};

    if (includeKeys.list) {
      (state as TExtractState<TData, 'list'>).list = {
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
      (state as TExtractState<TData, 'single'>).single = {
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
    setStateCall: SetState<TExtractStateAndActions<TData, TKey>>,
    getStateCall: GetState<TExtractStateAndActions<TData, TKey>>
  ): TExtractAction<TData, TKey> => {
    // @ts-ignore
    const actions: TExtractAction<TData, TKey> = {};

    if (includeKeys.list) {
      const getState = getStateCall as unknown as StateGetterCallType<TData, 'list'>;
      const setState = setStateCall as unknown as StateSetterCallType<TData, 'list'>;
      const callbacks = params as unknown as TExtractCallback<TData, 'list'>;

      (actions as TExtractAction<TData, 'list'>).getAll = async (): Promise<
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
          const result = await callbacks.loadAll(itemsLimit, itemsCount);
          if (!result) {
            throw new Error('SDK returned empty result.');
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
      const callbacks = params as unknown as TExtractCallback<TData, 'single'>;

      (actions as TExtractAction<TData, 'single'>).getById = async (
        id: DbIdentifier
      ): Promise<SingleStateDataInterface<TData>> => {
        const single = getState().single;
        single.status = 'loading';
        setState({ single });

        try {
          const result = await callbacks.loadById(id);
          if (!result) {
            throw new Error('SDK returned empty result.');
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

  const storeVanilla = createVanilla<TExtractStateAndActions<TData, TKey>>(
    (set, get) => ({
      ...buildInitialState(),
      ...buildActions(set, get),
    })
  );

  const storeReact = createReact(storeVanilla);

  const useSelector = (...keys: Array<TKey>) => {
    const state = storeReact() as TExtractStateAndActions<TData, TKey>;
    if (!keys || keys.length === 0) {
      return state;
    }

    // @ts-ignore
    return keys.reduce<Pick<TExtractState<TData, TKey>, typeof keys[number]>>(
      (acc, value: StateKeyType) => {
        // @ts-ignore
        acc[value] = state[value];
        return acc;
      },
      // @ts-ignore
      {} as Pick<TExtractState<TData, TKey>, typeof keys[number]>
    );
  };

  // #region actions
  const buildRootActions = () => {
    // @ts-ignore
    const rootActions: TExtractAction<TData, TKey> = {};

    if (includeKeys.list) {
      (rootActions as TExtractAction<TData, 'list'>).getAll = () => {
        return (
          storeVanilla.getState() as unknown as TExtractAction<TData, 'list'>
        ).getAll();
      };
    }

    if (includeKeys.single) {
      (rootActions as TExtractAction<TData, 'single'>).getById = (id: DbIdentifier) => {
        return (
          storeVanilla.getState() as unknown as TExtractAction<TData, 'single'>
        ).getById(id);
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
