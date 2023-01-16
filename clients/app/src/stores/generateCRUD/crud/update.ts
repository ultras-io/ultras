import type {
  IUpdateGetState,
  IUpdateGroupedInterceptor,
  IUpdateGroupedState,
  IUpdateSetState,
  IUpdateStateData,
} from '../types/crud/update';
import type {
  IBeforeSend,
  IScheme,
  IStateDataScheme,
  IStateFieldScheme,
} from '../types/scheme';

import { createField, processSchemeValueAndValidate } from '../utils/helpers';

function generateInitialState<TScheme>(
  scheme: IScheme<TScheme> | null | undefined
): IUpdateStateData<TScheme> {
  const initialData: IUpdateStateData<TScheme> = {
    status: 'default',
    resourceId: null,
    error: null,
    // @ts-ignore
    data: {},
    valid: false,
  };

  if (scheme) {
    Object.keys(scheme).forEach((keyName: string) => {
      const key = keyName as keyof TScheme;

      const initSchemeValue = scheme[key].initialValue;
      const initialValue =
        typeof initSchemeValue === 'undefined' ? null : initSchemeValue;

      const field = createField(initialValue);
      initialData.data![key] = field;
    });

    Object.keys(scheme).forEach((keyName: string) => {
      processSchemeValueAndValidate<TScheme>(
        initialData,
        scheme,
        keyName as keyof TScheme
      );
    });
  }

  return initialData;
}

// build initial state for update.
export const buildInitialState = <TData, TScheme>(
  state: IUpdateGroupedState<TData, TScheme>,
  scheme: IScheme<TScheme> | null | undefined
) => {
  state.update = state.update || {};
  state.update = {
    ...state.update,
    ...generateInitialState<TScheme>(scheme),
  };
};

// build actions for update.
export const buildActions = <TData, TScheme>(
  actions: IUpdateGroupedState<TData, TScheme>,
  getState: IUpdateGetState<TData, TScheme>,
  setState: IUpdateSetState<TData, TScheme>,
  interceptors: IUpdateGroupedInterceptor<TData, TScheme>
) => {
  actions.update = {
    ...actions.update,

    // set the resource id which need to be updated
    setResourceId(resourceId: ResourceIdentifier) {
      const update = getState().update;
      update.resourceId = resourceId;

      setState({ update });
    },

    // add setFieldValue method to action list, that setting value property
    // by provided key and value, and it will call validate interceptor method
    // to set "valid" boolean property of "update" state
    setFieldValue<TFieldKey extends keyof TData>(
      fieldKey: TFieldKey,
      fieldValue: TData[TFieldKey]
    ): void {
      const key = fieldKey as unknown as keyof TScheme;
      const value = fieldValue as unknown as TScheme[keyof TScheme];

      const update = getState().update;

      // @ts-ignore
      update.data = update.data || {};
      update.data![key] = update.data![key] || createField();

      update.data![key].valueOriginal = value;
      update.data![key].valueToSave = value;
      update.data![key].errors = [];

      processSchemeValueAndValidate<TScheme>(update, interceptors.scheme, key);

      for (const dataKeyName of Object.keys(update.data!)) {
        const dataKey = dataKeyName as keyof TScheme;

        const isValid = update.data![dataKey].isValid;
        if (!isValid) {
          update.valid = false;
          break;
        }
      }

      setState({ update });
    },

    // add update method to action list, that just calling update interceptor method
    // which sending data to api server
    async update(): Promise<TData | null> {
      const update = getState().update;
      if (!update.valid) {
        return null;
      }

      const updateData = update.data!;

      const mapData = interceptors.scheme || updateData;
      if (!mapData) {
        return null;
      }

      const state = Object.keys(mapData).reduce(
        (acc: IStateDataScheme<TScheme>, keyName: string) => {
          const key = keyName as keyof TScheme;

          acc[key] = updateData[key];
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
          acc[key] = updateData![key].valueToSave || updateData![key].valueOriginal;
          return acc;
        }, {} as any);
      }

      update.status = 'loading';
      setState({ update });

      try {
        const apiResult = await interceptors.update(update.resourceId, result);
        if (!apiResult) {
          throw new Error('"create" returned empty result.');
        }

        if (!apiResult.body.success) {
          const message = JSON.stringify(apiResult.body.error);
          throw new Error(`Error received: ${message}`);
        }

        update.status = 'success';
        setState({ update });

        return apiResult.body.data;
      } catch (e) {
        update.status = 'error';
        update.error = e as Error;

        setState({ update });
        return null;
      }
    },

    // reset to initial state
    reset() {
      setState({
        update: {
          ...getState().update,
          ...generateInitialState<TScheme>(interceptors.scheme),
        },
      });
    },
  };
};

// build actions for update.
export const build = <TData, TScheme>(
  stateAndActions: IUpdateGroupedState<TData, TScheme>,
  getState: IUpdateGetState<TData, TScheme>,
  setState: IUpdateSetState<TData, TScheme>,
  interceptors: IUpdateGroupedInterceptor<TData, TScheme>
) => {
  buildInitialState(stateAndActions, interceptors.scheme);
  buildActions(stateAndActions, getState, setState, interceptors);
};
