import { timezone } from '@ultras/utils';

import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import LikeableInterface from '../LikeableInterface';
import type { QueryParam, ResourceIdentifier } from '../types';
import type { GetMatchesFilter, GetMatchesResponse, GetMatchResponse } from './types';

export * from './types';

export class MatchSDK extends CoreApiBaseSDK implements LikeableInterface {
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

  public getLikes(matchId: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest(`${matchId}/likes`);
  }

  public like(matchId: ResourceIdentifier) {
    return this.api?.makeAPIPostRequest(`${matchId}/likes`);
  }

  public unlike(matchId: ResourceIdentifier) {
    return this.api?.makeAPIDeleteRequest(`${matchId}/likes`);
  }

  public getComments(matchId: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest(`${matchId}/comments`);
  }

  public addComment(matchId: ResourceIdentifier, content: string) {
    return this.api?.makeAPIPostRequest(`${matchId}/comments`, {
      body: {
        content,
      },
    });
  }

  public updateComment(
    matchId: ResourceIdentifier,
    commentId: ResourceIdentifier,
    content: string
  ) {
    return this.api?.makeAPIPutRequest(`${matchId}/comments/${commentId}`, {
      body: {
        content,
      },
    });
  }

  public deleteComment(matchId: ResourceIdentifier, commentId: ResourceIdentifier) {
    return this.api?.makeAPIDeleteRequest(`${matchId}/comments/${commentId}`);
  }
}
