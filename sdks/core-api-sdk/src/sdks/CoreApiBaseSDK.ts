import NetworkService from '@ultras/services/NetworkService';
import { Interceptor } from '../interceptors/types';
import { AuthTokenInterceptor } from '../interceptors';

export type Mode = 'dev' | 'staging' | 'production';

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
    return this.api?.makeAPIGetRequest('/ping');
  }

  public getVersion() {
    return this.api?.makeAPIGetRequest('/versions/current');
  }
}

export default CoreApiBaseSDK;
