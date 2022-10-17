import type { IAddStateData } from '../types/crud/add';
import type {
  IBeforeSend,
  IScheme,
  IStateDataScheme,
  IStateFieldScheme,
} from '../types/scheme';
import type {
  RootStoreType,
  ExtractStateType,
  ExtractActionType,
  ExtractInterceptorType,
  StateGetterCallType,
  StateSetterCallType,
} from '../types/store';

import { createField, processSchemeValueAndValidate } from '../utils/helpers';

type CurrentStoreKeyType = 'add';

function generateInitialState<TData, TScheme>(
  scheme: IScheme<TScheme> | null | undefined
): IAddStateData<TData, TScheme> {
  const initialData: IAddStateData<TData, TScheme> = {
    status: 'default',
    error: null,
    // @ts-ignore
    data: {},
    valid: false,
    createdData: null,
  };

  if (scheme) {
    Object.keys(scheme).forEach((keyName: string) => {
      const key = keyName as keyof TScheme;

      const field = createField(scheme[key].initialValue || null);
      initialData.data![key] = field;

      processSchemeValueAndValidate<TData, TScheme>(
        initialData,
        scheme,
        keyName as keyof TScheme
      );
    });
  }

  return initialData;
}

// build initial state for add.
export const buildInitialState = <TData, TFilter, TScheme>(
  state: ExtractStateType<
    null,
    null,
    TData,
    null,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  scheme: IScheme<TScheme> | null | undefined
) => {
  state.add = generateInitialState<TData, TScheme>(scheme);
};

// build actions for list.
export const buildActions = <TData, TFilter, TScheme>(
  actions: ExtractActionType<
    null,
    null,
    TData,
    null,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  getState: StateGetterCallType<
    null,
    null,
    TData,
    null,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  setState: StateSetterCallType<
    null,
    null,
    TData,
    null,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  interceptors: ExtractInterceptorType<
    null,
    null,
    TData,
    null,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >
) => {
  // add setAddFieldValue method to action list, that setting value property
  // by provided key and value, and it will call validate interceptor method
  // to set "valid" boolean property of "add" state
  actions.setAddFieldValue = <TFieldKey extends keyof TData>(
    fieldKey: TFieldKey,
    fieldValue: TData[TFieldKey]
  ): void => {
    const key = fieldKey as unknown as keyof TScheme;
    const value = fieldValue as unknown as TScheme[keyof TScheme];

    const add = getState().add;

    // @ts-ignore
    add.data = add.data || {};
    add.data![key] = add.data![key] || createField();

    add.data![key].valueOriginal = value;
    add.data![key].valueToSave = value;
    add.data![key].errors = [];

    processSchemeValueAndValidate<TData, TScheme>(add, interceptors.scheme, key);

    add.data![key].isValid = add.data![key].errors.length === 0;
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
  };

  // add create method to action list, that just calling create interceptor method
  // which sending data to api server
  actions.create = async (): Promise<TData | null> => {
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
  };

  // reset to initial state
  actions.reset = () => {
    setState({ add: generateInitialState<TData, TScheme>(interceptors.scheme) });
  };
};

// build root actions for add.
export const buildRootAction = <TData, TFilter, TScheme>(
  rootActions: ExtractActionType<
    null,
    null,
    TData,
    null,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  storeVanilla: RootStoreType<
    null,
    null,
    TData,
    null,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >
) => {
  const getVanillaState = () => {
    return storeVanilla.getState() as ExtractActionType<
      null,
      null,
      TData,
      null,
      null,
      CurrentStoreKeyType,
      TFilter,
      TScheme
    >;
  };

  rootActions.setAddFieldValue = <TFieldKey extends keyof TData>(
    fieldKey: TFieldKey,
    fieldValue: TData[TFieldKey]
  ) => {
    return getVanillaState().setAddFieldValue(fieldKey, fieldValue);
  };

  rootActions.create = () => {
    return getVanillaState().create();
  };

  rootActions.reset = () => {
    return getVanillaState().reset();
  };
};
