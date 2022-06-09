import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, DynamicQueryParam, ResourceIdentifier } from '../types';
import { GetLeaguesFilter } from './types';
export * from './types';

export class LeagueSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'leagues');
  }

  public getLeagues(params: QueryParam<GetLeaguesFilter> = {}) {
    return this.api?.makeAPIGetRequest('', {
      query_params: this.buildQueryParam(params),
    });
  }

  public getLeague(id: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest(id.toString());
  }
}
