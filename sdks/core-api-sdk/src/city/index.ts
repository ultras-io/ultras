import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';

export class CitySdk extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'cities');
  }

  // @TODO write types
  public getCities(params = {}) {
    return this.api?.makeAPIGetRequest('', {
      query_params: params,
    });
  }

  public getCity(id: number) {
    return this.api?.makeAPIGetRequest(id.toString());
  }
}
