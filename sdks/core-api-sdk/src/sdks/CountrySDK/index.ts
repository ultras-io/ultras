import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, DynamicQueryParam, DbIdentifier } from '../types';
import type {
  GetCountriesFilter,
  GetCountriesResponse,
  GetCountryResponse,
} from './types';
export * from './types';

export class CountrySDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'countries');
  }

  public getCountries(params: QueryParam<GetCountriesFilter> = {}) {
    return this.api?.makeAPIGetRequest<GetCountriesResponse>('', {
      query_params: params as DynamicQueryParam,
    });
  }

  public getCountry(id: DbIdentifier) {
    return this.api?.makeAPIGetRequest<GetCountryResponse>(id.toString());
  }
}
