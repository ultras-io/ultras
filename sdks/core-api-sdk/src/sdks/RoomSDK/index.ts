import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, ResourceIdentifier } from '../types';
import { GetRoomsFilter, CreateRoomType, UpdateRoomType } from './types';
export * from './types';

export class RoomSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'rooms');
  }

  public getRooms(params: QueryParam<GetRoomsFilter> = {}) {
    return this.api?.makeAPIGetRequest('', {
      query_params: this.buildQueryParam(params),
    });
  }

  public getRoom(id: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest(id.toString());
  }

  public createRoom(params: CreateRoomType) {
    return this.api?.makeAPIPostRequest('', {
      body: params,
    });
  }

  public updateRoom(id: ResourceIdentifier, params: UpdateRoomType) {
    return this.api?.makeAPIPutRequest(id.toString(), {
      body: params,
    });
  }

  public deleteRoom(id: ResourceIdentifier) {
    return this.api?.makeAPIDeleteRequest(id.toString());
  }
}
