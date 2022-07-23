import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import type { QueryParam, ResourceIdentifier } from '../types';
import type { GetEventMembersFilter, GetEventMembersResponse } from './types';

export * from './types';

export class EventMemberSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'events');
  }

  public getMembers(
    eventId: ResourceIdentifier,
    params: QueryParam<GetEventMembersFilter> = {}
  ) {
    return this.api?.makeAPIGetRequest<GetEventMembersResponse>(`${eventId}/members`, {
      query_params: this.buildQueryParam(params),
    });
  }

  public join(eventId: ResourceIdentifier) {
    return this.api?.makeAPIPostRequest(`${eventId}/members`);
  }

  public leave(eventId: ResourceIdentifier) {
    return this.api?.makeAPIDeleteRequest(`${eventId}/members`);
  }
}
