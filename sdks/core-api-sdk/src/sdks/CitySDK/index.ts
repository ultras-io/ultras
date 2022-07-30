import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import type { QueryParam, ResourceIdentifier } from '../types';
import type { GetCitiesFilter, GetCitiesResponse, GetCityResponse } from './types';

export * from './types';

export class CitySDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'cities');
  }

  public getCities(params: QueryParam<GetCitiesFilter> = {}) {
    return this.api?.makeAPIGetRequest<GetCitiesResponse>('', {
      query_params: this.buildQueryParam(params),
    });
  }

  public getCity(id: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest<GetCityResponse>(id.toString());
  }
}
