import create from 'zustand';
import { UserSDK } from '@ultras/core-api-sdk';
import StorageService from 'services/storage/storageService';
import { IState, IProps } from './types';

UserSDK.onTokenUpdate((token: string) => {
  StorageService.setAuthToken(token);
});

const sdk = new UserSDK('dev');

let authenticationStore: any;

const initialState: IProps = {
  isLoading: true,
  isAuthenticated: false,
  token: '',
  user: null,
};

const initStore = () => {
  if (!authenticationStore) {
    authenticationStore = create<IState>(set => ({
      ...initialState,
      authenticate: async () => {
        const token = await StorageService.getAuthToken();

        if (!token) {
          set({ isLoading: false });
        } else {
          UserSDK.setAuthToken(token);

          const response = await sdk.getMe();
          const { user } = response?.body.data;

          if (!user) {
            set({ isLoading: false });
          } else {
            set({ isLoading: false, isAuthenticated: true, token, user });
          }
        }
      },
      login: async (token, user) => {
        UserSDK.setAuthToken(token);
        await StorageService.setAuthToken(token);

        set({ isLoading: false, isAuthenticated: true, token, user });
      },
      logout: async () => {
        await sdk.logout();

        UserSDK.setAuthToken('');
        await StorageService.setAuthToken('');

        set({ isAuthenticated: false });
      },
    }));
  }

  return authenticationStore;
};

export default initStore;
