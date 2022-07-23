import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import type { QueryParam, ResourceIdentifier } from '../types';
import type { GetVenuesFilter, GetVenueResponse, GetVenuesResponse } from './types';

export * from './types';

export class VenueSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'venues');
  }

  public getVenues(params: QueryParam<GetVenuesFilter> = {}) {
    return this.api?.makeAPIGetRequest<GetVenuesResponse>('', {
      query_params: this.buildQueryParam(params),
    });
  }

  public getVenue(id: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest<GetVenueResponse>(id.toString());
  }
}
