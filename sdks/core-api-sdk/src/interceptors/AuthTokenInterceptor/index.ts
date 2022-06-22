import EventListenerService from '@ultras/services/EventListenerService';
import type { Interceptor } from '@ultras/services/NetworkService/types';
import type { OnUpdateListener } from './types';

const eventListener = new EventListenerService<string>();

let authToken = '';

const AuthTokenInterceptor: Interceptor = {
  request: ({ url, options }) => {
    if (authToken) {
      options.headers = options.headers || {};
      options.headers['Authorization'] = `Bearer ${authToken}`;
    }
  },

  response: ({ body, headers }) => {
    if (body && body.meta && body.meta.auth_token) {
      authToken = body.meta.auth_token;
      eventListener.dispatch(authToken);
    }
  },

  setAuthToken: (token: string) => {
    authToken = token;
  },

  onTokenUpdate: (callback: OnUpdateListener) => {
    eventListener.register(callback);
  },
};

export default AuthTokenInterceptor;
