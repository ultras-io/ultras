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
    authenticationStore = create<IState>((set, get) => ({
      ...initialState,
      authenticate: async () => {
        const token = await StorageService.getAuthToken();
        if (!token) {
          set({ isLoading: false });
        } else {
          try {
            UserSDK.setAuthToken(token);
            const response = await sdk.getMe();
            const { user } = response?.body.data;
            if (!user) {
              set({ isLoading: false });
            } else {
              set({ isLoading: false, isAuthenticated: true, token, user });
            }
          } catch (e) {
            await get().clearToken();
          }
        }
      },
      login: async (token, user) => {
        UserSDK.setAuthToken(token);
        await StorageService.setAuthToken(token);
        set({ isLoading: false, isAuthenticated: true, token, user });
      },
      logout: async () => {
        try {
          await sdk.logout();
        } finally {
          await get().clearToken();
        }
      },
      updateTeams: teamId => {
        const user = get().user;
        if (user) {
          if (user.teams.indexOf(teamId) === -1) {
            set({ user: { ...user, teams: [...user.teams, teamId] } });
          } else if (user.teams.length > 1) {
            set({
              user: {
                ...user,
                teams: user.teams.filter(id => id !== teamId),
              },
            });
          }
        }
      },
      clearToken: async () => {
        UserSDK.setAuthToken('');
        await StorageService.setAuthToken('');
        set({ isAuthenticated: false });
      },
    }));
  }

  return authenticationStore;
};

export default initStore;
