import { create as createStore } from 'zustand';
import produce from 'immer';
import { IState, IProps } from './types';
import { buildUserSDK } from 'stores/sdkBuilder/sdkBuilder';

const sdk = buildUserSDK();

let registrationStore: any;

const initialState: IProps = {
  status: 'initial',
  statusNext: 'initial',
  step: 1,
  loginStep: false,
  token: '',
  userResponse: {},
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
      key: 'common-email',
      keyInvert: 'common-phone',
      value: 'string',
      isEmail: true,
    },
    exists: false,
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
    registrationStore = createStore<IState>((set, get) => ({
      ...initialState,
      nextStep: () =>
        set(state => ({
          step: state.step + 1,
          status: 'initial',
          statusNext: 'initial',
        })),

      toLoginStep: () =>
        set(state => ({
          loginStep: true,
          step: state.step + 1,
          status: 'initial',
          statusNext: 'initial',
        })),

      jumpToStep: step =>
        set({
          step,
          status: 'initial',
          statusNext: 'initial',
        }),

      setNotificationsAllowed: allowed =>
        set(
          produce(state => {
            state.user.notificationsAllowed = allowed;
          })
        ),

      setLocationEnabled: enabled =>
        set(
          produce(state => {
            state.user.locationEnabled = enabled;
          })
        ),

      setSelected: data =>
        set(
          produce(state => {
            const { dataType, ...selected } = data;
            state.user[dataType] = selected;
          })
        ),

      switchJoinMethod: () =>
        set(
          produce(state => {
            state.user.joinVia = {
              key: state.user.joinVia.keyInvert,
              keyInvert: state.user.joinVia.key,
              isEmail: !state.user.joinVia.isEmail,
              value: '',
            };
          })
        ),

      confirmIdentity: value => {
        if (value) {
          set(
            produce(state => {
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
              produce(state => {
                state.user.exists = response.body.data.userExists;
                state.status = 'success';
              })
            );
          });
        } else {
          // @TODO handle error
          set({ status: 'error' });
        }
      },

      verifyCode: value => {
        set(
          produce(state => {
            state.user.code = value!;
          })
        );
        const isEmail = get().user.joinVia.isEmail;
        const emailOrPhone = get().user.joinVia.value;
        const code = '+374'; // @TODO get().user.country.name;

        const promise = isEmail
          ? sdk.verifyCode({ email: emailOrPhone, code: value })
          : sdk.verifyCode({ phone: code + emailOrPhone, code: value });

        if (promise) {
          set({ statusNext: 'loading' });
          promise?.then(response => {
            set(
              produce(state => {
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

      checkUsername: value => {
        set(
          produce(state => {
            state.user.username = value!;
          })
        );

        if (value.length < 4) {
          set(
            produce(state => {
              state.user.isUserNameValid = false;
              state.status = 'success';
            })
          );
        } else {
          set({ status: 'loading' });
          sdk.checkUsernameExistence(value)?.then(response => {
            // @TODO handle error
            set(
              produce(state => {
                state.status = 'success';
                state.user.isUserNameValid = response.body.data.available;
              })
            );
          });
        }
      },

      login: () => {
        const emailOrPhoneKey = get().user.joinVia.isEmail ? 'email' : 'phone';
        const emailOrPhone = get().user.joinVia.value;
        const code = get().user.code;

        set({ status: 'loading' });
        sdk
          .login({ code, [emailOrPhoneKey]: emailOrPhone })
          ?.then(response => {
            const auth_token = response.body.meta?.auth_token!;
            if (!auth_token) {
              set({ status: 'error' });
            } else {
              set(
                produce(state => {
                  state.status = 'success';
                  state.token = auth_token;
                  state.userResponse = response.body.data.user;
                })
              );
            }
          })
          .catch((err: any) => {
            // @TODO handle error
            console.error(err);
            set({ status: 'error' });
          });
      },

      register: () => {
        const teamId = Number(get().user.team.id);
        const emailOrPhoneKey = get().user.joinVia.isEmail ? 'email' : 'phone';
        const emailOrPhone = get().user.joinVia.value;
        const code = get().user.code;
        const username = get().user.username;

        if (teamId) {
          set({ statusNext: 'loading' });
          sdk
            .register({ teamId, code, username, [emailOrPhoneKey]: emailOrPhone })
            ?.then(response => {
              const auth_token = response.body.meta?.auth_token!;
              if (!auth_token) {
                set({ statusNext: 'error' });
              } else {
                set(
                  produce(state => {
                    state.statusNext = 'success';
                    state.token = auth_token;
                    state.userResponse = response.body.data.user;
                  })
                );
              }
            })
            .catch((err: any) => {
              // @TODO handle error
              console.error(err);
              set({ status: 'error' });
            });
        } else {
          set({ statusNext: 'error' });
        }
      },

      clearStore: () => {
        set(initialState);
      },
    }));
  }

  return registrationStore;
};

export default {
  initStore,
  nextStepSelector: () => (state: IState) => state.nextStep,
  toLoginStepSelector: () => (state: IState) => state.toLoginStep,
  jumpToStepSelector: () => (state: IState) => state.jumpToStep,
  setNotificationsAllowedSelector: () => (state: IState) => state.setNotificationsAllowed,
  setLocationEnabledSelector: () => (state: IState) => state.setLocationEnabled,
  setSelectedSelector: () => (state: IState) => state.setSelected,
  switchJoinMethodSelector: () => (state: IState) => state.switchJoinMethod,
  confirmIdentitySelector: () => (state: IState) => state.confirmIdentity,
  verifyCodeSelector: () => (state: IState) => state.verifyCode,
  checkUsernameSelector: () => (state: IState) => state.checkUsername,
  loginSelector: () => (state: IState) => state.login,
  registerSelector: () => (state: IState) => state.register,
  clearStoreSelector: () => (state: IState) => state.clearStore,
};
