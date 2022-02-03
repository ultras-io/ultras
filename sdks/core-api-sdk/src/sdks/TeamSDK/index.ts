import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, DynamicQueryParam, DbIdentifier } from '../types';
import { GetTeamsFilter } from './types';

export class TeamSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'teams');
  }

  public getTeams(params: QueryParam<GetTeamsFilter> = {}) {
    return this.api?.makeAPIGetRequest('', {
      query_params: params as DynamicQueryParam,
    });
  }

  public getTeam(id: DbIdentifier) {
    return this.api?.makeAPIGetRequest(id.toString());
  }
}
