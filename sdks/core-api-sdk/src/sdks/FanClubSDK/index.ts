import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, DynamicQueryParam, ResourceIdentifier } from '../types';
import {
  GetFanClubsFilter,
  FanClubCreateType,
  FanClubUpdateType,
  GetFanClubsResponse,
  GetFanClubResponse,
  UpdateFanClubResponse,
  CreateFanClubResponse,
} from './types';

export * from './types';

export class FanClubSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'fan-clubs');
  }

  public getFanClubs(params: QueryParam<GetFanClubsFilter> = {}) {
    return this.api?.makeAPIGetRequest<GetFanClubsResponse>('', {
      query_params: params as DynamicQueryParam,
    });
  }

  public getFanClub(id: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest<GetFanClubResponse>(id.toString());
  }

  public create(params: FanClubCreateType) {
    return this.api?.makeAPIPostRequest<CreateFanClubResponse>('', {
      body: params,
    });
  }

  public update(id: ResourceIdentifier, params: FanClubUpdateType) {
    return this.api?.makeAPIPostRequest<UpdateFanClubResponse>(id.toString(), {
      body: params,
    });
  }
}
