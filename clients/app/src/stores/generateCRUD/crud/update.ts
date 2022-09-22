import type { UpdateStateDataInterface } from '../types/crud/update';
import type {
  BeforeSendInterface,
  SchemeInterface,
  StateDataSchemeInterface,
  StateFieldSchemeInterface,
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

type CurrentStoreKeyType = 'update';

function generateInitialState<TData, TScheme>(
  scheme: SchemeInterface<TScheme> | null | undefined
): UpdateStateDataInterface<TData, TScheme> {
  // @ts-ignore
  const stateUpdateData: StateDataSchemeInterface<TScheme> = {};

  if (scheme) {
    Object.keys(scheme).forEach((keyName: string) => {
      const key = keyName as keyof TScheme;

      const field = createField(scheme[key].initialValue || null);
      stateUpdateData[key] = field;
    });
  }

  return {
    status: 'default',
    resourceId: null,
    error: null,
    data: stateUpdateData,
    valid: false,
  };
}

// build initial state for update.
export const buildInitialState = <TData, TFilter, TScheme>(
  state: ExtractStateType<
    null,
    null,
    null,
    TData,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  scheme: SchemeInterface<TScheme> | null | undefined
) => {
  state.update = generateInitialState<TData, TScheme>(scheme);
};

// build actions for list.
export const buildActions = <TData, TFilter, TScheme>(
  actions: ExtractActionType<
    null,
    null,
    null,
    TData,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  getState: StateGetterCallType<
    null,
    null,
    null,
    TData,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  setState: StateSetterCallType<
    null,
    null,
    null,
    TData,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  interceptors: ExtractInterceptorType<
    null,
    null,
    null,
    TData,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >
) => {
  // set the resource id which need to be updated
  actions.setResourceId = (resourceId: ResourceIdentifier) => {
    const update = getState().update;
    update.resourceId = resourceId;

    setState({ update });
  };

  // add setUpdateFieldValue method to action list, that setting value property
  // by provided key and value, and it will call validate interceptor method
  // to set "valid" boolean property of "update" state
  actions.setUpdateFieldValue = <TFieldKey extends keyof TData>(
    fieldKey: TFieldKey,
    fieldValue: TData[TFieldKey]
  ): void => {
    const key = fieldKey as unknown as keyof TScheme;
    const value = fieldValue as unknown as TScheme[keyof TScheme];

    const update = getState().update;

    // @ts-ignore
    update.data = update.data || {};
    update.data![key] = update.data![key] || createField();

    update.data![key].valueOriginal = value;
    update.data![key].valueToSave = value;
    update.data![key].errors = [];

    if (
      typeof interceptors.scheme !== 'undefined' &&
      typeof interceptors.scheme[key] !== 'undefined'
    ) {
      const schemeItem = interceptors.scheme[key];

      if (typeof schemeItem.processValue === 'function') {
        update.data![key].valueToSave = schemeItem.processValue(
          update.data![key].valueOriginal
        );
      }

      if (typeof schemeItem.validate === 'function') {
        let errors = schemeItem.validate(
          update.data![key].valueOriginal,
          update.data![key].valueToSave
        );

        if (!errors) {
          errors = [];
        }

        update.data![key].errors = errors;
      }
    }

    update.data![key].isValid = update.data![key].errors.length === 0;
    update.valid = true;

    for (const dataKeyName of Object.keys(update.data!)) {
      const dataKey = dataKeyName as keyof TScheme;

      const isValid = update.data![dataKey].isValid;
      if (!isValid) {
        update.valid = false;
        break;
      }
    }

    setState({ update });
  };

  // add updateData method to action list, that just calling updateData interceptor method
  // which sending data to api server
  actions.updateData = async (): Promise<TData | null> => {
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
      (acc: StateDataSchemeInterface<TScheme>, keyName: string) => {
        const key = keyName as keyof TScheme;

        acc[key] = updateData[key];
        return acc;
      },
      {} as StateDataSchemeInterface<TScheme>
    );

    const stateValues = Object.values(state) as Array<
      StateFieldSchemeInterface<keyof TScheme>
    >;

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
      const beforeSendCall = interceptors.beforeSend as BeforeSendInterface<
        TData,
        TScheme
      >;

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
      const apiResult = await interceptors.updateData(update.resourceId, result);
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
  };

  // reset to initial state
  actions.reset = () => {
    setState({ update: generateInitialState<TData, TScheme>(interceptors.scheme) });
  };
};

// build root actions for update.
export const buildRootAction = <TData, TFilter, TScheme>(
  rootActions: ExtractActionType<
    null,
    null,
    null,
    TData,
    null,
    CurrentStoreKeyType,
    TFilter,
    TScheme
  >,
  storeVanilla: RootStoreType<
    null,
    null,
    null,
    TData,
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
      null,
      TData,
      null,
      CurrentStoreKeyType,
      TFilter,
      TScheme
    >;
  };

  rootActions.setResourceId = (resourceId: ResourceIdentifier) => {
    return getVanillaState().setResourceId(resourceId);
  };

  rootActions.setUpdateFieldValue = <TFieldKey extends keyof TData>(
    fieldKey: TFieldKey,
    fieldValue: TData[TFieldKey]
  ) => {
    return getVanillaState().setUpdateFieldValue(fieldKey, fieldValue);
  };

  rootActions.updateData = () => {
    return getVanillaState().updateData();
  };

  rootActions.reset = () => {
    return getVanillaState().reset();
  };
};
