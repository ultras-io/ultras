import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { ResourceIdentifier, DynamicQueryParam, QueryParam } from '../types';
import {
  BulkCreateFavoriteTeamResult,
  GetFavoriteTeamResult,
  GetFavoriteTeamsFilter,
  GetFavoriteTeamsResult,
  SingleCreateFavoriteTeamResult,
} from './types';
export * from './types';

export class FavoriteTeamSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'favorite-teams');
  }

  public add(teamId: ResourceIdentifier) {
    return this.api?.makeAPIPostRequest<SingleCreateFavoriteTeamResult>('', {
      body: {
        teamId: teamId,
      },
    });
  }

  public addBulk(teamIds: Array<ResourceIdentifier>) {
    return this.api?.makeAPIPostRequest<BulkCreateFavoriteTeamResult>('', {
      body: {
        teamId: teamIds,
      },
    });
  }

  public getFavoriteTeams(params: QueryParam<GetFavoriteTeamsFilter>) {
    return this.api?.makeAPIGetRequest<GetFavoriteTeamsResult>('', {
      query_params: this.buildQueryParam(params),
    });
  }

  public getById(id: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest<GetFavoriteTeamResult>(`/${id}`);
  }

  public remove(id: ResourceIdentifier) {
    return this.api?.makeAPIDeleteRequest(`/${id}`);
  }
}
