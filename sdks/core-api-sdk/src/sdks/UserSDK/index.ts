import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import {
  IConfirmIdentity,
  IVerifyCode,
  IRegistration,
  ILogin,
  ConfirmIdentityResponse,
  VerifyCodeResponse,
  CheckUserExistenceResponse,
  LoginResponse,
  LogoutResponse,
  GetMeResponse,
  GetProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from './types';
import type { OnUpdateListener } from '../../interceptors/AuthTokenInterceptor/types';
import AuthTokenInterceptor from '../../interceptors/AuthTokenInterceptor';
import { ResourceIdentifier } from '../types';

export * from './types';

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

  public confirmIdentity(params: IConfirmIdentity) {
    return this.api?.makeAPIPostRequest<ConfirmIdentityResponse>('identity-confirm', {
      body: params,
    });
  }

  public verifyCode(params: IVerifyCode) {
    return this.api?.makeAPIPostRequest<VerifyCodeResponse>('verify-code', {
      body: params,
    });
  }

  public checkUsernameExistence(username: string) {
    return this.api?.makeAPIGetRequest<CheckUserExistenceResponse>(
      'check-username-existence',
      {
        query_params: { username },
      }
    );
  }

  public register(params: IRegistration) {
    return this.api?.makeAPIPostRequest<LoginResponse>('register', {
      body: params,
    });
  }

  public login(params: ILogin) {
    return this.api?.makeAPIPostRequest<LoginResponse>('login', {
      body: params,
    });
  }

  public logout() {
    return this.api?.makeAPIDeleteRequest<LogoutResponse>('revoke-token');
  }

  public getMe() {
    return this.api?.makeAPIGetRequest<GetMeResponse>('me');
  }

  public getProfile(id: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest<GetProfileResponse>(`/profile/${id}`);
  }

  public updateProfile(params: UpdateProfileRequest) {
    return this.api?.makeAPIPutRequest<UpdateProfileResponse>('me', {
      body: params,
    });
  }
}
