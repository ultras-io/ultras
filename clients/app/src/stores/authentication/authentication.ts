import create from 'zustand';
// import { UserSDK } from '@ultras/core-api-sdk';
import StorageService from 'services/storage/storageService';
import { IState, IProps } from './types';
// const sdk = new UserSDK('dev');

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
          // sdk.getMe(token);
          const user = await StorageService.getObject('user'); // @TODO change to response from call
          set({ isLoading: false, isAuthenticated: true, token, user });
        }
      },
      login: async (token, user) => {
        await StorageService.setAuthToken(token);
        StorageService.setObject('user', user); // @TODO remove when sdk will be ready
        set({ isLoading: false, isAuthenticated: true, token, user });
      },
      logout: async () => {
        await StorageService.setAuthToken('');
        set({ isAuthenticated: false });
      },
    }));
  }

  return authenticationStore;
};

export default initStore;
