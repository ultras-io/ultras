import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, DynamicQueryParam } from '../types';

type GetCountriesFilter = {
  name?: string;
  code?: string;
};

export class CountrySdk extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'countries');
  }

  public getCountries(params: QueryParam<GetCountriesFilter> = {}) {
    return this.api?.makeAPIGetRequest('', {
      query_params: params as DynamicQueryParam,
    });
  }

  public getCountry(id: number) {
    return this.api?.makeAPIGetRequest(id.toString());
  }
}
