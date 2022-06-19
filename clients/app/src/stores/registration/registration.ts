import create from 'zustand';
import produce from 'immer';
import { UserSDK } from '@ultras/core-api-sdk';
import { IState, IProps, ListItemSelectType } from './types';

const sdk = new UserSDK('dev');

let registrationStore: any;

const initialState: IProps = {
  status: 'initial',
  statusNext: 'initial',
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
    isCodeValid: false,
    isUserNameValid: false,
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
      nextStep: () =>
        set((state: IState) => ({
          step: state.step + 1,
          status: 'initial',
          statusNext: 'initial',
        })),

      jumpToStep: (step: number) =>
        set({
          step,
          status: 'initial',
          statusNext: 'initial',
        }),

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
            set(
              produce((state: IState) => {
                state.user.eixsts = response.body.data.userExists;
                state.status = 'success';
              })
            );
          });
        } else {
          // @TODO handle error
          set({ status: 'error' });
        }
      },

      verifyCode: (value: string) => {
        set(
          produce((state: IState) => {
            state.user.code = value!;
          })
        );
        const isEmail = get().user.joinVia.isEmail;
        const emailOrPhpne = get().user.joinVia.value;
        const code = '+374'; // @TODO get().user.country.name;

        const promise = isEmail
          ? sdk.verifyCode({ email: emailOrPhpne, code: value })
          : sdk.verifyCode({ phone: code + emailOrPhpne, code: value });

        if (promise) {
          set({ statusNext: 'loading' });
          promise?.then(response => {
            set(
              produce((state: IState) => {
                state.user.isCodeValid = response.body.data.valid;
                state.statusNext = 'success';
              })
            );
          });
        } else {
          // @TODO handle error
          set({ statusNext: 'error' });
        }
      },

      checkUsername: (value: string) => {
        set(
          produce((state: IState) => {
            state.user.username = value!;
          })
        );

        if (value.length < 4) {
          set(
            produce((state: IState) => {
              state.user.isUserNameValid = false;
              state.status = 'success';
            })
          );
        } else {
          set({ status: 'loading' });
          sdk.checkUsernameExistence(value)?.then(response => {
            // @TODO handle error
            set({ status: 'success' });
            set(
              produce((state: IState) => {
                state.user.isUserNameValid = response.body.data.available;
                state.status = 'success';
              })
            );
          });
        }
      },

      register: () => {
        const teamId = Number(get().user.team.id);
        const emailOrPhoneKey = get().user.joinVia.key;
        const emailOrPhone = get().user.joinVia.value;
        const code = get().user.code;
        const username = get().user.username;

        if (teamId) {
          set({ statusNext: 'loading' });
          sdk
            .register({ teamId, code, username, [emailOrPhoneKey]: emailOrPhone })
            ?.then(response => {
              // @TODO handle error
              set({ statusNext: 'success' });
              console.log(response);
            });
        } else {
          set({ statusNext: 'error' });
        }
      },
    }));
  }

  return registrationStore;
};

export default initStore;
