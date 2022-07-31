import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import type { QueryParam, ResourceIdentifier } from '../types';
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
      query_params: this.buildQueryParam(params),
    });
  }

  public getCountry(id: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest<GetCountryResponse>(id.toString());
  }
}
