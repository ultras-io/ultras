import createVanilla from 'zustand/vanilla';
import type { SetState, GetState } from 'zustand/vanilla';
import createReact from 'zustand';
import type { ResourceIdentifier } from '@ultras/core-api-sdk';
import { createField, fillStateKeys, buildFilterHash } from './helpers';
import type {
  StateKeyType,
  ParamsType,
  StateGetterCallType,
  StateSetterCallType,
  ExtractActionType,
  ExtractStateType,
  ExtractStateAndActionType,
  ExtractInterceptorType,
  ListStateDataInterface,
  SingleStateDataInterface,
  StateDataAddInterface,
  BeforeSendInterface,
  FullFilterable,
} from './types';

export const defaultLimit = 50;

export const generateCRUD = <
  TData extends object,
  TFilter,
  TKey extends StateKeyType = StateKeyType,
  TImmutableFilter = {}
>(
  params: ParamsType<TData, TKey, TFilter, TImmutableFilter>
) => {
  // @ts-ignore
  const includeKeys = fillStateKeys(params.keys || []);

  // #region state
  const buildInitialState = (): ExtractStateType<TData, TKey, TFilter> => {
    // @ts-ignore
    const state: ExtractStateType<TData, TKey> = {};

    // #region list
    if (includeKeys.list) {
      (state as unknown as ExtractStateType<TData, 'list', TFilter>).list = {
        status: 'loading',
        error: null,
        data: null,
        filter: null,
        filterHash: null,
        pagination: {
          total: null,
          limit: 0,
          offset: 0,
        },
      };
    }
    // #endregion

    // #region single
    if (includeKeys.single) {
      (state as unknown as ExtractStateType<TData, 'single', TFilter>).single = {
        status: 'loading',
        error: null,
        data: null,
      };
    }
    //#endregion

    // #region add
    if (includeKeys.add) {
      const { scheme } = params as unknown as ExtractInterceptorType<
        TData,
        'add',
        TFilter
      >;

      const stateAddData: StateDataAddInterface = Object.keys(scheme).reduce(
        (acc, key) => {
          acc[key] = createField(scheme[key].initialValue || null);
          return acc;
        },
        {} as StateDataAddInterface
      );

      (state as unknown as ExtractStateType<TData, 'add', TFilter>).add = {
        status: 'loading',
        error: null,
        data: stateAddData,
        valid: false,
      };
    }
    // #endregion

    return state;
  };
  // #endregion

  // #region actions
  const buildActions = (
    setStateCall: SetState<ExtractStateAndActionType<TData, TKey, TFilter>>,
    getStateCall: GetState<ExtractStateAndActionType<TData, TKey, TFilter>>
  ): ExtractActionType<TData, TKey, TFilter> => {
    // @ts-ignore
    const actions: ExtractActionType<TData, TKey> = {};

    // #region list
    if (includeKeys.list) {
      const getState = getStateCall as unknown as StateGetterCallType<
        TData,
        'list',
        TFilter
      >;
      const setState = setStateCall as unknown as StateSetterCallType<
        TData,
        'list',
        TFilter
      >;
      const interceptors = params as unknown as ExtractInterceptorType<
        TData,
        'list',
        TFilter
      >;

      // add updateFilter method to action list, that partially updates filter values,
      // after updating filter getAll method must be called to load data with new filter
      //
      // filterHash will be calculated in getAll step
      (actions as unknown as ExtractActionType<TData, 'list', TFilter>).updateFilter = (
        filter: Partial<TFilter>
      ) => {
        const list = getState().list;
        list.filter = list.filter || {};

        Object.keys(filter).forEach((filterKey: string) => {
          const key = filterKey as keyof TFilter;
          (list.filter as Partial<TFilter>)[key] = filter[key];
        });
      };

      // add getAll method to action list, that just calling loadAll interceptor method
      // and updates "list" state
      (actions as unknown as ExtractActionType<TData, 'list', TFilter>).getAll =
        async (): Promise<ListStateDataInterface<TData, TFilter>> => {
          const list = getState().list;

          // we need to reset previously loaded data if filter was changed
          const filterHash = buildFilterHash(list.filter);
          if (filterHash !== list.filterHash) {
            list.filterHash = filterHash;
            list.data = null;
            list.pagination.limit = 0;
            list.pagination.offset = 0;
            list.pagination.total = null;
          }

          const itemsLimit = params.limit || defaultLimit;
          const itemsCount = list.data?.length || 0;

          if (list.pagination.total === itemsCount) {
            return list;
          }

          list.status = 'loading';
          setState({ list });

          try {
            const filterData = {
              ...(list.filter || {}),
              ...(params.immutableFilter || {}),
              limit: itemsLimit,
              offset: itemsCount,
            };

            console.log(JSON.stringify(filterData, null, 2));

            const result = await interceptors.loadAll(
              filterData as unknown as FullFilterable<Partial<TFilter>>
            );

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
    // #endregion

    // #region single
    if (includeKeys.single) {
      const getState = getStateCall as unknown as StateGetterCallType<
        TData,
        'single',
        TFilter
      >;
      const setState = setStateCall as unknown as StateSetterCallType<
        TData,
        'single',
        TFilter
      >;
      const interceptors = params as unknown as ExtractInterceptorType<
        TData,
        'single',
        TFilter
      >;

      // add getSingle method to action list, that just calling loadSingle interceptor method
      // and updates "single" state
      (actions as unknown as ExtractActionType<TData, 'single', TFilter>).getSingle =
        async (id: ResourceIdentifier): Promise<SingleStateDataInterface<TData>> => {
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
    // #endregion

    // #region add
    if (includeKeys.add) {
      const { scheme, beforeSend } = params as unknown as ExtractInterceptorType<
        TData,
        'add',
        TFilter
      >;

      const getState = getStateCall as unknown as StateGetterCallType<
        TData,
        'add',
        TFilter
      >;
      const setState = setStateCall as unknown as StateSetterCallType<
        TData,
        'add',
        TFilter
      >;
      const interceptors = params as unknown as ExtractInterceptorType<
        TData,
        'add',
        TFilter
      >;

      // add setFieldValue method to action list, that setting value property
      // by provided key and value, and it will call validate interceptor method
      // to set "valid" boolean property of "add" state
      (actions as unknown as ExtractActionType<TData, 'add', TFilter>).setFieldValue = <
        TFieldKey extends keyof TData
      >(
        fieldKey: TFieldKey,
        fieldValue: TData[TFieldKey]
      ): void => {
        const key = fieldKey as unknown as string;
        const value = fieldValue as unknown as string;

        const add = getState().add;

        add.data = add.data || {};
        add.data[key] = add.data[key] || createField();

        add.data[key].valueOriginal = value;
        add.data[key].valueToSave = value;
        add.data[key].errors = [];

        if (typeof scheme[key] !== 'undefined') {
          const schemeItem = scheme[key];

          if (typeof schemeItem.processValue === 'function') {
            add.data[key].valueToSave = schemeItem.processValue(
              add.data[key].valueOriginal
            );
          }

          if (typeof schemeItem.validate === 'function') {
            let errors = schemeItem.validate(
              add.data[key].valueOriginal,
              add.data[key].valueToSave
            );

            if (!errors) {
              errors = [];
            }

            add.data[key].errors = errors;
          }
        }

        add.data[key].isValid = add.data[key].errors.length === 0;
        add.valid = true;

        for (const dataKey in Object.keys(add.data)) {
          const isValid = add.data![dataKey].isValid;
          if (!isValid) {
            add.valid = false;
            break;
          }
        }

        setState({ add });
      };

      // add create method to action list, that just calling create interceptor method
      // which sending data to api server
      (actions as unknown as ExtractActionType<TData, 'add', TFilter>).create =
        async (): Promise<TData | null> => {
          const add = getState().add;
          if (!add.valid) {
            return null;
          }

          const addData = add.data!;

          const state = Object.keys(scheme).reduce((acc, key) => {
            acc[key] = addData[key];
            return acc;
          }, {} as StateDataAddInterface);

          for (const stateItem of Object.values(state)) {
            if (!stateItem.isValid) {
              return null;
            }
          }

          let result: any = {};

          // if beforeSend middleware was provided then it will be triggered and
          // received result must be sent to backend, otherwise state values will
          // be used to send to backend.
          if (typeof beforeSend === 'function') {
            const beforeSendCall = beforeSend as unknown as BeforeSendInterface<TData>;
            result = await beforeSendCall(state);

            if (!result) {
              return null;
            }
          } else {
            result = Object.keys(scheme).reduce((acc, key) => {
              acc[key] = addData[key].valueToSave || addData[key].valueOriginal;
              return acc;
            }, {} as any);
          }

          add.status = 'loading';
          setState({ add });

          try {
            const apiResult = await interceptors.create(result);
            if (!apiResult) {
              throw new Error('"create" returned empty result.');
            }

            add.status = 'success';

            setState({ add });
            return apiResult.body.data;
          } catch (e) {
            add.status = 'error';
            add.error = e as Error;

            setState({ add });
            return null;
          }
        };
    }
    // #endregion

    return actions;
  };
  // #endregion

  const storeVanilla = createVanilla<ExtractStateAndActionType<TData, TKey, TFilter>>(
    (set, get) => ({
      ...buildInitialState(),
      ...buildActions(set, get),
    })
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

  // #region actions
  const buildRootActions = (): ExtractActionType<TData, TKey, TFilter> => {
    // @ts-ignore
    const rootActions: ExtractActionType<TData, TKey, TFilter> = {};

    // #region list
    if (includeKeys.list) {
      (rootActions as unknown as ExtractActionType<TData, 'list', TFilter>).getAll =
        () => {
          return (
            storeVanilla.getState() as unknown as ExtractActionType<
              TData,
              'list',
              TFilter
            >
          ).getAll();
        };

      (rootActions as unknown as ExtractActionType<TData, 'list', TFilter>).updateFilter =
        (filter: Partial<TFilter>) => {
          return (
            storeVanilla.getState() as unknown as ExtractActionType<
              TData,
              'list',
              TFilter
            >
          ).updateFilter(filter);
        };
    }
    // #endregion

    // #region single
    if (includeKeys.single) {
      (rootActions as unknown as ExtractActionType<TData, 'single', TFilter>).getSingle =
        (id: ResourceIdentifier) => {
          return (
            storeVanilla.getState() as unknown as ExtractActionType<
              TData,
              'single',
              TFilter
            >
          ).getSingle(id);
        };
    }
    // #endregion

    // #region add
    if (includeKeys.add) {
      (rootActions as unknown as ExtractActionType<TData, 'add', TFilter>).setFieldValue =
        <TFieldKey extends keyof TData>(
          fieldKey: TFieldKey,
          fieldValue: TData[TFieldKey]
        ) => {
          return (
            storeVanilla.getState() as unknown as ExtractActionType<TData, 'add', TFilter>
          ).setFieldValue(fieldKey, fieldValue);
        };

      (rootActions as unknown as ExtractActionType<TData, 'add', TFilter>).create =
        () => {
          return (
            storeVanilla.getState() as unknown as ExtractActionType<TData, 'add', TFilter>
          ).create();
        };
    }
    // #endregion

    return rootActions;
  };
  // #endregion

  return {
    useStore: storeReact,
    useSelector: useSelector,
    destroy: storeVanilla.destroy,
    getState: storeVanilla.getState,
    setState: storeVanilla.setState,

    ...buildRootActions(),
  };
};
