import { timezone } from '@ultras/utils';

import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, DynamicQueryParam } from '../types';

type GetMatchesFilter = {
  date?: string;
  dateFrom?: string;
  dateTo?: string;
  teamId?: number;
  leagueId?: number;
};

export class MatchSdk extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'matches');
  }

  private dateToUtc(date: string, type: 'start' | 'end'): string {
    const time = 'start' === type ? '00:00:00.000' : '23:59:59.999';
    return timezone.localToZulu(`${date} ${time}`);
  }

  public getMatches(params: QueryParam<GetMatchesFilter> = {}) {
    if (params.date) {
      params.dateFrom = params.date;
      params.dateTo = params.date;

      delete params.date;
    }

    if (params.dateFrom) {
      params.dateFrom = this.dateToUtc(params.dateFrom, 'start');
    }
    if (params.dateTo) {
      params.dateTo = this.dateToUtc(params.dateTo, 'end');
    }

    return this.api?.makeAPIGetRequest('', {
      query_params: params as DynamicQueryParam,
    });
  }

  public getMatch(id: number) {
    return this.api?.makeAPIGetRequest(id.toString());
  }
}
