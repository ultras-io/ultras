import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import ICatchable from '../ICatchable';
import type { DynamicQueryParam, QueryParam, ResourceIdentifier } from '../types';
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

export class RoomSDK extends CoreApiBaseSDK implements ICatchable {
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

  public getCatches(roomId: ResourceIdentifier, params: QueryParam) {
    return this.api?.makeAPIGetRequest(`${roomId}/catches`, {
      query_params: params as DynamicQueryParam,
    });
  }

  public catch(roomId: ResourceIdentifier) {
    return this.api?.makeAPIPostRequest(`${roomId}/catches`);
  }

  public uncatch(roomId: ResourceIdentifier) {
    return this.api?.makeAPIDeleteRequest(`${roomId}/catches`);
  }

  public getComments(roomId: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest(`${roomId}/comments`);
  }

  public addComment(roomId: ResourceIdentifier, content: string) {
    return this.api?.makeAPIPostRequest(`${roomId}/comments`, {
      body: {
        content,
      },
    });
  }

  public updateComment(
    roomId: ResourceIdentifier,
    commentId: ResourceIdentifier,
    content: string
  ) {
    return this.api?.makeAPIPutRequest(`${roomId}/comments/${commentId}`, {
      body: {
        content,
      },
    });
  }

  public deleteComment(roomId: ResourceIdentifier, commentId: ResourceIdentifier) {
    return this.api?.makeAPIDeleteRequest(`${roomId}/comments/${commentId}`);
  }
}
