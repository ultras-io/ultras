import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import LikeableInterface from '../LikeableInterface';
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

export class RoomSDK extends CoreApiBaseSDK implements LikeableInterface {
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

  public getLikes(roomId: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest(`${roomId}/likes`);
  }

  public like(roomId: ResourceIdentifier) {
    return this.api?.makeAPIPostRequest(`${roomId}/likes`);
  }

  public unlike(roomId: ResourceIdentifier) {
    return this.api?.makeAPIDeleteRequest(`${roomId}/likes`);
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
