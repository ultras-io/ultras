import { validatePhone, validateEmail, validateFullname } from '@ultras/utils';
import { create as createStore, StoreApi, UseBoundStore } from 'zustand';
import { buildUserSDK } from 'stores/sdkBuilder/sdkBuilder';
import { IField, IMethods, IState, IParam, IStore, FieldType } from './types';

const sdk = buildUserSDK();

function validate(field: FieldType, value: Nullable<string>): boolean {
  if (!value) {
    return false;
  }

  switch (field) {
    case 'fullname':
      return validateFullname(value);
    case 'phone':
      return validatePhone(value);
    case 'email':
      return validateEmail(value);
    case 'avatar':
      return true;
  }

  return false;
}

function makeField(
  field: FieldType,
  value: Nullable<string>,
  touched: boolean = false
): IField {
  return {
    value: value,
    valid: validate(field, value),
    touched: touched,
  };
}

const initialState: IState = {
  fullname: makeField('fullname', null, false),
  email: makeField('email', null, false),
  phone: makeField('phone', null, false),
  avatar: makeField('avatar', null, false),
};

function buildMethods(
  setState: StoreApi<IStore>['setState'],
  getState: StoreApi<IStore>['getState']
): IMethods {
  return {
    initiateWithValues(initial: IParam) {
      setState({
        ...initial,
        fullname: makeField('fullname', initial.fullname, false),
        email: makeField('email', initial.email, false),
        phone: makeField('phone', initial.phone, false),
        avatar: makeField('avatar', initial.avatar, false),
      });
    },
    setFieldValue(field: FieldType, value: Nullable<string>) {
      setState({ [field]: makeField(field, value) });
    },
    async update(field: FieldType, confirmCode?: string) {
      const currentState = getState();
      const { value, valid } = currentState[field];

      if (!valid) {
        return;
      }

      return sdk.updateProfile({
        code: confirmCode,
        [field]: value,
      });
    },
    async sendCode(field: FieldType) {
      const currentState = getState();
      const { value, valid } = currentState[field];

      if (!valid) {
        return;
      }

      return sdk.updateProfile({
        [field]: value,
      });
    },
  };
}

let store: Nullable<UseBoundStore<StoreApi<IStore>>> = null;

function buildStore(): UseBoundStore<StoreApi<IStore>> {
  return createStore<IStore>((set, get) => ({
    ...initialState,
    ...buildMethods(set, get),
  }));
}

export function initStore(): UseBoundStore<StoreApi<IStore>> {
  if (!store) {
    store = buildStore();
  }

  return store;
}
