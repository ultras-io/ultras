import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import {
  ConfirmIdentityInterface,
  VerifyCodeInterface,
  RegistrationInterface,
  LoginInterface,
} from './types';
export * from './types';

import type { OnUpdateListener } from '../../interceptors/AuthTokenInterceptor/types';
import AuthTokenInterceptor from '../../interceptors/AuthTokenInterceptor';

export class UserSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'users');
  }

  public static setAuthToken(token: string) {
    AuthTokenInterceptor.setAuthToken(token);
  }

  public static onTokenUpdate(callback: OnUpdateListener) {
    AuthTokenInterceptor.onTokenUpdate(callback);
  }

  public confirmIdentity(params: ConfirmIdentityInterface) {
    return this.api?.makeAPIPostRequest('identity-confirm', {
      body: params,
    });
  }

  public verifyCode(params: VerifyCodeInterface) {
    return this.api?.makeAPIPostRequest('verify-code', {
      body: params,
    });
  }

  public checkUsernameExistence(username: string) {
    return this.api?.makeAPIGetRequest('check-username-existence', {
      query_params: { username },
    });
  }

  public register(params: RegistrationInterface) {
    return this.api?.makeAPIPostRequest('register', {
      body: params,
    });
  }

  public login(params: LoginInterface) {
    return this.api?.makeAPIPostRequest('login', {
      body: params,
    });
  }

  public logout() {
    return this.api?.makeAPIDeleteRequest('revoke-token');
  }

  public getMe() {
    return this.api?.makeAPIGetRequest('me');
  }
}
