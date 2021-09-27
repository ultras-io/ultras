import config from '../../../config';
import NetworkService from 'core/services/network/NetworkService';

/**
 * @class LoginSDK
 */
class LoginSDK {
  private readonly _apiService: NetworkService | null = null;

  constructor() {
    this._apiService = new NetworkService(config.apiURL);
  }

  async ping(): Promise<any> {
    return this._apiService?.makeAPIGetRequest('ping');
  }
}

export default new LoginSDK();
