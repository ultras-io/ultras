import NetworkService from '@ultras/services/NetworkService';
import type { ResponseInterface } from '@ultras/services/NetworkService';
import { Interceptor } from '../interceptors/types';
import { AuthTokenInterceptor } from '../interceptors';
import type { ApiResponseType, ListResponseMetaType } from './types';

export type Mode = 'dev' | 'staging' | 'production';
export { ApiResponseType, ListResponseMetaType, ResponseInterface };

class CoreApiBaseSDK {
  protected api: NetworkService | undefined;

  private interceptors: Array<Interceptor> = [AuthTokenInterceptor];

  public constructor(protected mode: Mode = 'staging', protected baseUri: string) {
    let uri = '';

    switch (mode) {
      case 'dev':
        uri = `http://localhost:10001/v1/${baseUri}`;
        break;
      case 'staging':
        uri = `http://api.ultras.io/v1/${baseUri}`;
        break;
      case 'production':
        // not implemented yet
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
}

export default CoreApiBaseSDK;
