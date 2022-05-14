import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, DynamicQueryParam, ResourceIdentifier } from '../types';
import { GetCitiesFilter } from './types';

export * from './types';

export class CitySDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'cities');
  }

  public getCities(params: QueryParam<GetCitiesFilter> = {}) {
    return this.api?.makeAPIGetRequest('', {
      query_params: params as DynamicQueryParam,
    });
  }

  public getCity(id: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest(id.toString());
  }
}
