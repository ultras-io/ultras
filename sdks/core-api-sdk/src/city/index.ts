import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam } from '../types';

type GetCitiesFilter = {
  name?: string;
  countryId?: number;
};

export class CitySdk extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'cities');
  }

  public getCities(params: QueryParam<GetCitiesFilter> = {}) {
    return this.api?.makeAPIGetRequest('', {
      query_params: params,
    });
  }

  public getCity(id: number) {
    return this.api?.makeAPIGetRequest(id.toString());
  }
}
