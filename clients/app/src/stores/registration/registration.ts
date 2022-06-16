import create from 'zustand';
import produce from 'immer';
import { UserSDK } from '@ultras/core-api-sdk';
import { IState, IProps, ListItemSelectType } from './types';

const sdk = new UserSDK('dev');

let registrationStore: any;

const initialState: IProps = {
  status: 'initial',
  step: 1,
  user: {
    team: {
      id: undefined,
      name: '',
    },
    country: {
      id: undefined,
      name: '',
    },
    joinVia: {
      key: 'email',
      keyInvert: 'phone',
      value: 'string',
      isEmail: true,
    },
    eixsts: false,
    code: '',
    username: '',
    notificationsAllowed: false,
    locationEnabled: false,
  },
};

const initStore = () => {
  if (!registrationStore) {
    registrationStore = create<IState>((set, get) => ({
      ...initialState,
      nextStep: () => set((state: IState) => ({ step: state.step + 1 })),
      jumpToStep: (step: number) => set({ step, status: 'initial' }),
      setSelected: (data: ListItemSelectType) =>
        set(
          produce((state: IState) => {
            const { dataType, ...selected } = data;
            state.user[dataType] = selected;
          })
        ),
      swicthJoinMethod: () =>
        set(
          produce((state: IState) => {
            state.user.joinVia = {
              key: state.user.joinVia.keyInvert,
              keyInvert: state.user.joinVia.key,
              isEmail: !state.user.joinVia.isEmail,
              value: '',
            };
          })
        ),
      confirmIdentity: (value?: string) => {
        if (value) {
          set(
            produce((state: IState) => {
              state.user.joinVia.value = value!;
            })
          );
        } else {
          value = get().user.joinVia.value;
        }

        const isEmail = get().user.joinVia.isEmail;
        const code = '+374'; // @TODO get().user.country.name;

        const promise = isEmail
          ? sdk.confirmIdentity({ email: value })
          : sdk.confirmIdentity({ phone: code + value });

        if (promise) {
          set({ status: 'loading' });
          promise?.then(response => {
            set({ status: 'success' });
            set(
              produce((state: IState) => {
                state.user.eixsts = response.body.data.userExists;
              })
            );
          });
        } else {
          // @TODO handle error
          set({ status: 'error' });
        }
      },
    }));
  }

  return registrationStore;
};

export default initStore;
