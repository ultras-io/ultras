import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, DynamicQueryParam } from '../types';

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
      query_params: params as DynamicQueryParam,
    });
  }

  public getTeam(id: number) {
    return this.api?.makeAPIGetRequest(id.toString());
  }
}
