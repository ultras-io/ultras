import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, ResourceIdentifier } from '../types';
import { GetRoomMembersFilter } from './types';
export * from './types';

export class RoomMemberSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'rooms');
  }

  public getMembers(
    roomId: ResourceIdentifier,
    params: QueryParam<GetRoomMembersFilter> = {}
  ) {
    return this.api?.makeAPIGetRequest(`${roomId}/members`, {
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
