import { timezone } from '@ultras/utils';

import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import type { QueryParam, ResourceIdentifier } from '../types';
import type { GetMatchesFilter, GetMatchesResponse, GetMatchResponse } from './types';

export * from './types';

export class MatchSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'matches');
  }

  public getMatches(params: QueryParam<GetMatchesFilter> = {}) {
    if (params.date) {
      params.dateFrom = params.date;
      params.dateTo = params.date;

      delete params.date;
    }

    if (params.dateFrom) {
      params.dateFrom = timezone.localToZulu(`${params.dateFrom} 00:00:00.000`);
    }
    if (params.dateTo) {
      params.dateTo = timezone.localToZulu(`${params.dateTo} 23:59:59.999`);
    }

    return this.api?.makeAPIGetRequest<GetMatchesResponse>('', {
      query_params: this.buildQueryParam(params),
    });
  }

  public getMatch(id: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest<GetMatchResponse>(id.toString());
  }
}
