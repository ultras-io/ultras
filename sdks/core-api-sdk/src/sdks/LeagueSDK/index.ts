import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import type { QueryParam, ResourceIdentifier } from '../types';
import type { GetLeaguesFilter, GetLeaguesResponse, GetLeagueResponse } from './types';

export * from './types';

export class LeagueSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'leagues');
  }

  public getLeagues(params: QueryParam<GetLeaguesFilter> = {}) {
    return this.api?.makeAPIGetRequest<GetLeaguesResponse>('', {
      query_params: this.buildQueryParam(params),
    });
  }

  public getLeague(id: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest<GetLeagueResponse>(id.toString());
  }
}
