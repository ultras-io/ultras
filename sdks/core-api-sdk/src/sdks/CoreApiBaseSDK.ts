import NetworkService from '@ultras/services/NetworkService';
import type { ResponseInterface } from '@ultras/services/NetworkService';
import { Interceptor } from '@ultras/services/NetworkService/types';
import { AuthTokenInterceptor } from '../interceptors';
import configs from '../configs';
import type { ApiResponseType, ListResponseMetaType } from './types';
import { DynamicQueryParam, QueryParam } from './types';

export type Mode = 'dev' | 'staging' | 'production';
export { ApiResponseType, ListResponseMetaType, ResponseInterface };

class CoreApiBaseSDK {
  protected api: NetworkService | undefined;

  private interceptors: Array<Interceptor> = [AuthTokenInterceptor];

  public constructor(protected mode: Mode = 'staging', protected baseUri: string) {
    let uri = '';

    switch (mode) {
      case 'dev':
        uri = `${configs.coreApi.dev}/v1/${baseUri}`;
        break;
      case 'staging':
        uri = `${configs.coreApi.staging}/v1/${baseUri}`;
        break;
      case 'production':
        uri = `${configs.coreApi.prod}/v1/${baseUri}`;
        break;
    }

    this.api = new NetworkService(uri, this.interceptors);
  }

  public ping() {
    return this.api?.makeAPIGetRequest<{ message: string }>('/ping');
  }

  public getVersion() {
    return this.api?.makeAPIGetRequest<{ message: string }>('/versions/current');
  }

  public getVersions() {
    return this.api?.makeAPIGetRequest<{ [key in string]: string }>('/versions');
  }

  protected buildQueryParam(params: QueryParam<any>): DynamicQueryParam {
    const queryParams: DynamicQueryParam = {};

    for (const key in params) {
      // when provided key is ends with "Id" and is MultiResourceIdentifier type,
      // then we need to join it with comma with one key.
      //
      // otherwise it must be sent with multiple key-value way.
      if (/^.+Id$/.test(key) && Array.isArray(params[key])) {
        queryParams[key] = params[key].join(',');
      } else {
        queryParams[key] = params[key];
      }
    }

    return queryParams;
  }
}

export default CoreApiBaseSDK;
