import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';

export class TeamSdk extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'Teams');
  }

  public getTeams(params: { name?: string; countryId?: number; cityId?: number } = {}) {
    return this.api?.makeAPIGetRequest('', {
      query_params: params,
    });
  }

  public getTeam(id: number) {
    return this.api?.makeAPIGetRequest(id.toString());
  }
}
