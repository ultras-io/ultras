import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, DynamicQueryParam, ResourceIdentifier } from '../types';
import { GetTeamResponse, GetTeamsFilter, GetTeamsResponse } from './types';
export * from './types';

export class TeamSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'teams');
  }

  public getTeams(params: QueryParam<GetTeamsFilter> = {}) {
    return this.api?.makeAPIGetRequest<GetTeamsResponse>('', {
      query_params: this.buildQueryParam(params),
    });
  }

  public getTeam(id: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest<GetTeamResponse>(id.toString());
  }
}
