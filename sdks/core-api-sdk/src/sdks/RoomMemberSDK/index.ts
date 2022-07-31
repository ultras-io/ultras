import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import type { QueryParam, ResourceIdentifier } from '../types';
import type { GetRoomMembersFilter, GetRoomMembersResponse } from './types';

export * from './types';

export class RoomMemberSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'rooms');
  }

  public getMembers(
    roomId: ResourceIdentifier,
    params: QueryParam<GetRoomMembersFilter> = {}
  ) {
    return this.api?.makeAPIGetRequest<GetRoomMembersResponse>(`${roomId}/members`, {
      query_params: this.buildQueryParam(params),
    });
  }

  public join(roomId: ResourceIdentifier) {
    return this.api?.makeAPIPostRequest(`${roomId}/members`);
  }

  public leave(roomId: ResourceIdentifier) {
    return this.api?.makeAPIDeleteRequest(`${roomId}/members`);
  }
}
