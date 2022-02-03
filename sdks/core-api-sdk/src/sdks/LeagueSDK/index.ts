import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, DynamicQueryParam, DbIdentifier } from '../types';

type GetLeaguesFilter = {
  name?: string;
  countryId?: DbIdentifier;
};

export class LeagueSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'leagues');
  }

  public getLeagues(params: QueryParam<GetLeaguesFilter> = {}) {
    return this.api?.makeAPIGetRequest('', {
      query_params: params as DynamicQueryParam,
    });
  }

  public getLeague(id: DbIdentifier) {
    return this.api?.makeAPIGetRequest(id.toString());
  }
}
