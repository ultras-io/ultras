import type {
  IAddGroupedInterceptor,
  IAddStateData,
  IAddGroupedState,
  IAddGetState,
  IAddSetState,
} from '../types/crud/add';
import type {
  IBeforeSend,
  IScheme,
  IStateDataScheme,
  IStateFieldScheme,
} from '../types/scheme';

import {
  createField,
  initializeSchemeValue,
  processSchemeValueAndValidate,
} from '../utils/helpers';

function generateInitialState<TScheme>(
  scheme: IScheme<TScheme> | null | undefined
): IAddStateData<TScheme> {
  const initialData: IAddStateData<TScheme> = {
    status: 'default',
    error: null,
    // @ts-ignore
    data: {},
    valid: false,
    createdData: null,
  };

  if (scheme) {
    initializeSchemeValue(scheme, initialData);
  }

  return initialData;
}

// build initial state for add.
export const buildInitialState = <TData, TScheme>(
  state: IAddGroupedState<TData, TScheme>,
  scheme: IScheme<TScheme> | null | undefined
) => {
  state.add = state.add || {};
  state.add = {
    ...state.add,
    ...generateInitialState<TScheme>(scheme),
  };
};

// build actions for list.
export const buildActions = <TData, TScheme>(
  actions: IAddGroupedState<TData, TScheme>,
  getState: IAddGetState<TData, TScheme>,
  setState: IAddSetState<TData, TScheme>,
  interceptors: IAddGroupedInterceptor<TData, TScheme>
) => {
  actions.add = {
    ...actions.add,

    // add setFieldValue method to action list, that setting value property
    // by provided key and value, and it will call validate interceptor method
    // to set "valid" boolean property of "add" state
    setFieldValue<TFieldKey extends keyof TData>(
      fieldKey: TFieldKey,
      fieldValue: TData[TFieldKey]
    ): void {
      const key = fieldKey as unknown as keyof TScheme;
      const value = fieldValue as unknown as TScheme[keyof TScheme];

      const add = getState().add;

      // @ts-ignore
      add.data = add.data || {};
      add.data![key] = add.data![key] || createField();

      add.data![key].valueOriginal = value;
      add.data![key].valueToSave = value;
      add.data![key].errors = [];

      processSchemeValueAndValidate<TScheme>(
        add,
        interceptors.scheme,
        key,
        () => getState().add.data!
      );

      add.valid = true;

      for (const dataKeyName of Object.keys(add.data!)) {
        const dataKey = dataKeyName as keyof TScheme;

        const isValid = add.data![dataKey].isValid;
        if (!isValid) {
          add.valid = false;
          break;
        }
      }

      setState({ add });
    },

    // add create method to action list, that just calling create interceptor method
    // which sending data to api server
    async create(): Promise<TData | null> {
      const add = getState().add;
      if (!add.valid) {
        return null;
      }

      const addData = add.data!;

      const mapData = interceptors.scheme || addData;
      if (!mapData) {
        return null;
      }

      const state = Object.keys(mapData).reduce(
        (acc: IStateDataScheme<TScheme>, keyName: string) => {
          const key = keyName as keyof TScheme;

          acc[key] = addData[key];
          return acc;
        },
        {} as IStateDataScheme<TScheme>
      );

      const stateValues = Object.values(state) as Array<IStateFieldScheme<keyof TScheme>>;

      for (const stateItem of stateValues) {
        if (!stateItem.isValid) {
          return null;
        }
      }

      let result: any = {};

      // if beforeSend middleware was provided then it will be triggered and
      // received result must be sent to backend, otherwise state values will
      // be used to send to backend.
      if (typeof interceptors.beforeSend === 'function') {
        const beforeSendCall = interceptors.beforeSend as IBeforeSend<TData, TScheme>;

        result = await beforeSendCall(state);

        if (!result) {
          return null;
        }
      } else {
        result = Object.keys(mapData).reduce((acc, keyName: string) => {
          const key = keyName as keyof TScheme;
          acc[key] = addData![key].valueToSave || addData![key].valueOriginal;
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

        if (!apiResult.body.success) {
          const message = JSON.stringify(apiResult.body.error);
          throw new Error(`Error received: ${message}`);
        }

        add.createdData = apiResult.body.data || null;
        add.status = 'success';
        setState({ add });

        return apiResult.body.data;
      } catch (e) {
        add.status = 'error';
        add.error = e as Error;

        setState({ add });
        return null;
      }
    },

    // reset to initial state
    reset() {
      setState({
        add: {
          ...getState().add,
          ...generateInitialState<TScheme>(interceptors.scheme),
        },
      });
    },
  };
};

// build state and actions for add.
export const build = <TData, TScheme>(
  stateAndActions: IAddGroupedState<TData, TScheme>,
  getState: IAddGetState<TData, TScheme>,
  setState: IAddSetState<TData, TScheme>,
  interceptors: IAddGroupedInterceptor<TData, TScheme>
) => {
  buildInitialState(stateAndActions, interceptors.scheme);
  buildActions(stateAndActions, getState, setState, interceptors);
};
