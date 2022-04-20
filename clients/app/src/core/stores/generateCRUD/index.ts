import createVanilla from 'zustand/vanilla';
import type { SetState, GetState } from 'zustand/vanilla';
import createReact from 'zustand';
import type { DbIdentifier } from '@ultras/core-api-sdk';
import type {
  BaseStateDataInterface,
  BaseStoreInterface,
  BaseStateActionInterface,
  StoreCallbackInterface,
  StateKeyType,
  ListStateDataInterface,
  SingleStateDataInterface,
} from './types';

export const defaultLimit = 50;

export const generateCRUD = <T extends object>(params: StoreCallbackInterface<T>) => {
  // #region state
  const buildInitialState = (): BaseStateDataInterface<T> => ({
    list: {
      status: 'loading',
      error: null,
      data: null,
      pagination: {
        total: null,
        limit: 0,
        offset: 0,
      },
    },

    single: {
      status: 'loading',
      error: null,
      data: null,
    },
  });
  // #endregion

  // #region actions
  const buildActions = (
    setState: SetState<BaseStoreInterface<T>>,
    getState: GetState<BaseStoreInterface<T>>
  ): BaseStateActionInterface<T> => ({
    // #region action - getAll
    async getAll(): Promise<ListStateDataInterface<T>> {
      const list = getState().list;

      const itemsLimit = params.limit || defaultLimit;
      const itemsCount = list.data?.length || 0;

      if (list.pagination.total === itemsCount) {
        return list;
      }

      list.status = 'loading';
      setState({ list });

      try {
        const result = await params.loadAll(itemsLimit, itemsCount);
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
    },
    // #endregion

    // #region action - getById
    async getById(id: DbIdentifier): Promise<SingleStateDataInterface<T>> {
      const single = getState().single;
      single.status = 'loading';
      setState({ single });

      try {
        const result = await params.loadById(id);
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
    },
    // #endregion
  });
  // #endregion

  const storeVanilla = createVanilla<BaseStoreInterface<T>>((set, get) => ({
    ...buildInitialState(),
    ...buildActions(set, get),
  }));

  const storeReact = createReact(storeVanilla);

  const useSelector = (...keys: Array<StateKeyType<T>>) => {
    const state = storeReact() as BaseStateDataInterface<T>;
    if (!keys || keys.length === 0) {
      return state;
    }

    return keys.reduce<Pick<BaseStateDataInterface<T>, typeof keys[number]>>(
      (acc, value: StateKeyType<T>) => {
        // @ts-ignore
        acc[value] = state[value];
        return acc;
      },
      {} as Pick<BaseStateDataInterface<T>, typeof keys[number]>
    );
  };

  const getAll = () => storeVanilla.getState().getAll();
  const getById = (id: DbIdentifier) => storeVanilla.getState().getById(id);

  return {
    useStore: storeReact,
    useSelector: useSelector,
    // subscribe: storeVanilla.subscribe,
    destroy: storeVanilla.destroy,
    getState: storeVanilla.getState,
    setState: storeVanilla.setState,

    getAll: getAll,
    getById: getById,
  };
};
