import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, DynamicQueryParam } from '../types';

type GetVenuesFilter = {
  name?: string;
  countryId?: number;
  cityId?: number;
};

export class VenueSdk extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'venues');
  }

  public getVenues(params: QueryParam<GetVenuesFilter> = {}) {
    return this.api?.makeAPIGetRequest('', {
      query_params: params as DynamicQueryParam,
    });
  }

  public getVenue(id: number) {
    return this.api?.makeAPIGetRequest(id.toString());
  }
}
