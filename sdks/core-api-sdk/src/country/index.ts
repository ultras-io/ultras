import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';

export class CountrySdk extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'countries');
  }

  public getCountries(params: { name?: string; code?: string } = {}) {
    return this.api?.makeAPIGetRequest('', {
      query_params: params,
    });
  }

  public getCountry(id: number) {
    return this.api?.makeAPIGetRequest(id.toString(), {
      query_params: {
        name: 'Armenia',
      },
    });
  }
}
