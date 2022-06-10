import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, DynamicQueryParam, ResourceIdentifier } from '../types';
import { GetVenuesFilter } from './types';
export * from './types';

export class VenueSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'venues');
  }

  public getVenues(params: QueryParam<GetVenuesFilter> = {}) {
    return this.api?.makeAPIGetRequest('', {
      query_params: this.buildQueryParam(params),
    });
  }

  public getVenue(id: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest(id.toString());
  }
}
