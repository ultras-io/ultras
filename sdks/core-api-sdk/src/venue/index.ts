import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';

export class VenueSdk extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'venues');
  }

  public getVenues(params: { name?: string; countryId?: number; cityId?: number } = {}) {
    return this.api?.makeAPIGetRequest('', {
      query_params: params,
    });
  }

  public getVenue(id: number) {
    return this.api?.makeAPIGetRequest(id.toString());
  }
}
