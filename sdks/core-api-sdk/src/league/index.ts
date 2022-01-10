import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';

export class LeagueSdk extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'leagues');
  }

  public getLeagues(params: { name?: string; countryId?: number } = {}) {
    return this.api?.makeAPIGetRequest('', {
      query_params: params,
    });
  }

  public getLeague(id: number) {
    return this.api?.makeAPIGetRequest(id.toString());
  }
}
