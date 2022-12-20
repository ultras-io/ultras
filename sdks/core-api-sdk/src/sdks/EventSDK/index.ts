import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import ICommentable from '../ICommentable';
import ICatchable from '../ICatchable';
import type { DynamicQueryParam, QueryParam, ResourceIdentifier } from '../types';
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

export class EventSDK extends CoreApiBaseSDK implements ICatchable, ICommentable {
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

  public getCatches(eventId: ResourceIdentifier, params: QueryParam) {
    return this.api?.makeAPIGetRequest(`${eventId}/catches`, {
      query_params: params as DynamicQueryParam,
    });
  }

  public catch(eventId: ResourceIdentifier) {
    return this.api?.makeAPIPostRequest(`${eventId}/catches`);
  }

  public uncatch(eventId: ResourceIdentifier) {
    return this.api?.makeAPIDeleteRequest(`${eventId}/catches`);
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
