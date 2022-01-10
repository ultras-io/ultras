import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam } from '../types';

type GetTeamsFilter = {
  name?: string;
  countryId?: number;
  cityId?: number;
};

export class TeamSdk extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'Teams');
  }

  public getTeams(params: QueryParam<GetTeamsFilter> = {}) {
    return this.api?.makeAPIGetRequest('', {
      query_params: params,
    });
  }

  public getTeam(id: number) {
    return this.api?.makeAPIGetRequest(id.toString());
  }
}
