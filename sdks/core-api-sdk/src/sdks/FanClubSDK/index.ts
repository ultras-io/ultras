import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, DynamicQueryParam, DbIdentifier } from '../types';
import { GetFanClubsFilter, FanClubCreateType, FanClubUpdateType } from './types';

export class FanClubSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'fan-clubs');
  }

  public getFanClubs(params: QueryParam<GetFanClubsFilter> = {}) {
    return this.api?.makeAPIGetRequest('', {
      query_params: params as DynamicQueryParam,
    });
  }

  public getFanClub(id: DbIdentifier) {
    return this.api?.makeAPIGetRequest(id.toString());
  }

  public create(params: FanClubCreateType) {
    return this.api?.makeAPIPostRequest('', {
      body: params,
    });
  }

  public update(id: DbIdentifier, params: FanClubUpdateType) {
    return this.api?.makeAPIPostRequest(id.toString(), {
      body: params,
    });
  }
}
