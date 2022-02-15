import { timezone } from '@ultras/utils';

import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, DynamicQueryParam, DbIdentifier } from '../types';
import { GetMatchesFilter } from './types';

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

    return this.api?.makeAPIGetRequest('', {
      query_params: params as DynamicQueryParam,
    });
  }

  public getMatch(id: DbIdentifier) {
    return this.api?.makeAPIGetRequest(id.toString());
  }
}
