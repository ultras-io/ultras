import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, DynamicQueryParam, DbIdentifier } from '../types';
import {
  GetFanClubsFilter,
  FanClubCreateType,
  FanClubUpdateType,
  GetFanClubsResponse,
  GetFanClubResponse,
  UpdateFanClubResponse,
  CreateFanClubResponse,
} from './types';

export class FanClubSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'fan-clubs');
  }

  public getFanClubs(params: QueryParam<GetFanClubsFilter> = {}) {
    return this.api?.makeAPIGetRequest<GetFanClubsResponse>('', {
      query_params: params as DynamicQueryParam,
    });
  }

  public getFanClub(id: DbIdentifier) {
    return this.api?.makeAPIGetRequest<GetFanClubResponse>(id.toString());
  }

  public create(params: FanClubCreateType) {
    return this.api?.makeAPIPostRequest<CreateFanClubResponse>('', {
      body: params,
    });
  }

  public update(id: DbIdentifier, params: FanClubUpdateType) {
    return this.api?.makeAPIPostRequest<UpdateFanClubResponse>(id.toString(), {
      body: params,
    });
  }
}
