import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, DynamicQueryParam, DbIdentifier } from '../types';
import { GetCountriesFilter } from './types';

export class CountrySDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'countries');
  }

  public getCountries(params: QueryParam<GetCountriesFilter> = {}) {
    return this.api?.makeAPIGetRequest('', {
      query_params: params as DynamicQueryParam,
    });
  }

  public getCountry(id: DbIdentifier) {
    return this.api?.makeAPIGetRequest(id.toString());
  }
}
