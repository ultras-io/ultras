import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, DynamicQueryParam, DbIdentifier } from '../types';

type GetCitiesFilter = {
  name?: string;
  countryId?: DbIdentifier;
};

export class CitySDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'cities');
  }

  public getCities(params: QueryParam<GetCitiesFilter> = {}) {
    return this.api?.makeAPIGetRequest('', {
      query_params: params as DynamicQueryParam,
    });
  }

  public getCity(id: DbIdentifier) {
    return this.api?.makeAPIGetRequest(id.toString());
  }
}
