import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import type { QueryParam, ResourceIdentifier } from '../types';
import type {
  GetRoomsFilter,
  CreateRoomType,
  UpdateRoomType,
  GetRoomsResponse,
  GetRoomResponse,
  CreateRoomResponse,
  UpdateRoomResponse,
} from './types';

export * from './types';

export class RoomSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'rooms');
  }

  public getRooms(params: QueryParam<GetRoomsFilter> = {}) {
    return this.api?.makeAPIGetRequest<GetRoomsResponse>('', {
      query_params: this.buildQueryParam(params),
    });
  }

  public getRoom(id: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest<GetRoomResponse>(id.toString());
  }

  public createRoom(params: CreateRoomType) {
    return this.api?.makeAPIPostRequest<CreateRoomResponse>('', {
      body: params,
    });
  }

  public updateRoom(id: ResourceIdentifier, params: UpdateRoomType) {
    return this.api?.makeAPIPutRequest<UpdateRoomResponse>(id.toString(), {
      body: params,
    });
  }

  public deleteRoom(id: ResourceIdentifier) {
    return this.api?.makeAPIDeleteRequest(id.toString());
  }
}
