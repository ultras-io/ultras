import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam } from '../types';

type GetLeaguesFilter = {
  name?: string;
  countryId?: number;
};

export class LeagueSdk extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'leagues');
  }

  public getLeagues(params: QueryParam<GetLeaguesFilter> = {}) {
    return this.api?.makeAPIGetRequest('', {
      query_params: params,
    });
  }

  public getLeague(id: number) {
    return this.api?.makeAPIGetRequest(id.toString());
  }
}
