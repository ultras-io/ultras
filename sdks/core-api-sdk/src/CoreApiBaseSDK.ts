import NetworkService from '@ultras/services/NetworkService';

export type Mode = 'dev' | 'staging' | 'production';

class CoreApiBaseSDK {
  mode: Mode;
  api: NetworkService | undefined;

  public constructor(mode: Mode = 'staging', uri: string) {
    this.mode = mode;

    switch (mode) {
      case 'dev':
        this.api = new NetworkService(`http://localhost:10001/v1/${uri}`);
        break;
      case 'staging':
        this.api = new NetworkService(`http://api.ultras.io/v1/${uri}`);
        break;
      case 'production':
        // not implemented yet
        break;
    }
  }

  public ping() {
    return this.api?.makeAPIGetRequest('/ping');
  }

  public getVersion() {
    return this.api?.makeAPIGetRequest('/versions/current');
  }
}

export default CoreApiBaseSDK;
