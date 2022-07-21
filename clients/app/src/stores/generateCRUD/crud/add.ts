import type {
  BeforeSendInterface,
  SchemeInterface,
  StateDataSchemeInterface,
} from '../types/scheme';
import type {
  RootStoreType,
  ExtractStateType,
  ExtractActionType,
  ExtractInterceptorType,
  StateGetterCallType,
  StateSetterCallType,
} from '../types/store';

import { createField } from '../utils/helpers';

type CurrentStoreKeyType = 'add';

// build initial state for add.
export const buildInitialState = <TData, TFilter>(
  state: ExtractStateType<null, null, TData, null, null, CurrentStoreKeyType, TFilter>,
  scheme: SchemeInterface | null | undefined
) => {
  // @ts-ignore
  const stateAddData: StateDataSchemeInterface = {};

  if (scheme) {
    Object.keys(scheme).forEach((key: string) => {
      const field = createField(scheme[key].initialValue || null);
      stateAddData[key] = field;
    });
  }

  state.add = {
    status: 'loading',
    error: null,
    data: stateAddData,
    valid: false,
  };
};

// build actions for list.
export const buildActions = <TData, TFilter>(
  actions: ExtractActionType<null, null, TData, null, null, CurrentStoreKeyType, TFilter>,
  getState: StateGetterCallType<
    null,
    null,
    TData,
    null,
    null,
    CurrentStoreKeyType,
    TFilter
  >,
  setState: StateSetterCallType<
    null,
    null,
    TData,
    null,
    null,
    CurrentStoreKeyType,
    TFilter
  >,
  interceptors: ExtractInterceptorType<
    null,
    null,
    TData,
    null,
    null,
    CurrentStoreKeyType,
    TFilter
  >
) => {
  // add setFieldValue method to action list, that setting value property
  // by provided key and value, and it will call validate interceptor method
  // to set "valid" boolean property of "add" state
  actions.setFieldValue = <TFieldKey extends keyof TData>(
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

    if (
      typeof interceptors.scheme !== 'undefined' &&
      typeof interceptors.scheme[key] !== 'undefined'
    ) {
      const schemeItem = interceptors.scheme[key];

      if (typeof schemeItem.processValue === 'function') {
        add.data[key].valueToSave = schemeItem.processValue(add.data[key].valueOriginal);
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

    for (const dataKey of Object.keys(add.data)) {
      const isValid = add.data[dataKey].isValid;
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

    const state = Object.keys(mapData).reduce((acc, key) => {
      acc[key] = addData[key];
      return acc;
    }, {} as StateDataSchemeInterface);

    for (const stateItem of Object.values(state)) {
      if (!stateItem.isValid) {
        return null;
      }
    }

    let result: any = {};

    // if beforeSend middleware was provided then it will be triggered and
    // received result must be sent to backend, otherwise state values will
    // be used to send to backend.
    if (typeof interceptors.beforeSend === 'function') {
      const beforeSendCall = interceptors.beforeSend as BeforeSendInterface<TData>;
      result = await beforeSendCall(state);

      if (!result) {
        return null;
      }
    } else {
      result = Object.keys(mapData).reduce((acc, key) => {
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
};

// build root actions for add.
export const buildRootAction = <TData, TFilter>(
  rootActions: ExtractActionType<
    null,
    null,
    TData,
    null,
    null,
    CurrentStoreKeyType,
    TFilter
  >,
  storeVanilla: RootStoreType<null, null, TData, null, null, CurrentStoreKeyType, TFilter>
) => {
  const getVanillaState = () => {
    return storeVanilla.getState() as unknown as ExtractActionType<
      null,
      null,
      TData,
      null,
      null,
      CurrentStoreKeyType,
      TFilter
    >;
  };

  rootActions.setFieldValue = <TFieldKey extends keyof TData>(
    fieldKey: TFieldKey,
    fieldValue: TData[TFieldKey]
  ) => {
    return getVanillaState().setFieldValue(fieldKey, fieldValue);
  };

  rootActions.create = () => {
    return getVanillaState().create();
  };
};