import { validatePhone, validateEmail, validateFullname } from '@ultras/utils';
import create, { StoreApi, UseBoundStore } from 'zustand';
import { FieldInterface, IMethods, IState, IParam, IStore } from './types';

function validate(field: keyof IState, value: Nullable<string>): boolean {
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
  }

  return false;
}

function makeField(
  field: keyof IState,
  value: Nullable<string>,
  touched: boolean = false
): FieldInterface {
  return {
    value: value,
    valid: validate(field, value),
    touched: touched,
  };
}

const initialState: IState = {
  userId: 0,
  fullname: makeField('fullname', null, false),
  email: makeField('email', null, false),
  phone: makeField('phone', null, false),
};

function buildMethods(
  set: StoreApi<IStore>['setState'],
  get: StoreApi<IStore>['getState']
): IMethods {
  return {
    initiateWithValues(initial: IParam) {
      set({
        ...initial,
        fullname: makeField('fullname', initial.fullname, false),
        email: makeField('email', initial.email, false),
        phone: makeField('phone', initial.phone, false),
      });
    },
    setFieldValue(field: keyof IState, value: string) {
      set({ [field]: makeField(field, value) });
    },
    async update() {
      const { userId, fullname, email, phone } = get();
      // ...
    },
  };
}

let store: Nullable<UseBoundStore<StoreApi<IStore>>> = null;

function buildStore(): UseBoundStore<StoreApi<IStore>> {
  return create<IStore>((set, get) => ({
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
