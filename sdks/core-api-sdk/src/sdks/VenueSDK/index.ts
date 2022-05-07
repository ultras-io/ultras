import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, DynamicQueryParam, DbIdentifier } from '../types';
import { GetVenuesFilter } from './types';
export * from './types';

export class VenueSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'venues');
  }

  public getVenues(params: QueryParam<GetVenuesFilter> = {}) {
    return this.api?.makeAPIGetRequest('', {
      query_params: params as DynamicQueryParam,
    });
  }

  public getVenue(id: DbIdentifier) {
    return this.api?.makeAPIGetRequest(id.toString());
  }
}
