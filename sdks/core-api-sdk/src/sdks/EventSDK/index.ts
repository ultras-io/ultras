import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import CommentableInterface from '../CommentableInterface';
import LikeableInterface from '../LikeableInterface';
import type { QueryParam, ResourceIdentifier } from '../types';
import type {
  GetEventsFilter,
  GetEventsResponse,
  GetEventResponse,
  CreateEventType,
  CreateEventResponse,
  UpdateEventType,
  UpdateEventResponse,
} from './types';

export * from './types';

export class EventSDK
  extends CoreApiBaseSDK
  implements LikeableInterface, CommentableInterface
{
  constructor(mode?: Mode) {
    super(mode, 'events');
  }

  public getEvents(params: QueryParam<GetEventsFilter> = {}) {
    return this.api?.makeAPIGetRequest<GetEventsResponse>('', {
      query_params: this.buildQueryParam(params),
    });
  }

  public getEvent(id: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest<GetEventResponse>(id.toString());
  }

  public createEvent(params: CreateEventType) {
    return this.api?.makeAPIPostRequest<CreateEventResponse>('', {
      body: params,
    });
  }

  public updateEvent(id: ResourceIdentifier, params: UpdateEventType) {
    return this.api?.makeAPIPutRequest<UpdateEventResponse>(id.toString(), {
      body: params,
    });
  }

  public deleteEvent(id: ResourceIdentifier) {
    return this.api?.makeAPIDeleteRequest(id.toString());
  }

  public getLikes(eventId: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest(`${eventId}/likes`);
  }

  public like(eventId: ResourceIdentifier) {
    return this.api?.makeAPIPostRequest(`${eventId}/likes`);
  }

  public unlike(eventId: ResourceIdentifier) {
    return this.api?.makeAPIDeleteRequest(`${eventId}/likes`);
  }

  public getComments(eventId: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest(`${eventId}/comments`);
  }

  public addComment(eventId: ResourceIdentifier, content: string) {
    return this.api?.makeAPIPostRequest(`${eventId}/comments`, {
      body: {
        content,
      },
    });
  }

  public updateComment(
    eventId: ResourceIdentifier,
    commentId: ResourceIdentifier,
    content: string
  ) {
    return this.api?.makeAPIPutRequest(`${eventId}/comments/${commentId}`, {
      body: {
        content,
      },
    });
  }

  public deleteComment(eventId: ResourceIdentifier, commentId: ResourceIdentifier) {
    return this.api?.makeAPIDeleteRequest(`${eventId}/comments/${commentId}`);
  }
}
