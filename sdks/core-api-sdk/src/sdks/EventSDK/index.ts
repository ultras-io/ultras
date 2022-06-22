import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { QueryParam, ResourceIdentifier } from '../types';
import { GetEventsFilter, CreateEventType, UpdateEventType } from './types';
export * from './types';

export class EventSDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 'events');
  }

  public getEvents(params: QueryParam<GetEventsFilter> = {}) {
    return this.api?.makeAPIGetRequest('', {
      query_params: this.buildQueryParam(params),
    });
  }

  public getEvent(id: ResourceIdentifier) {
    return this.api?.makeAPIGetRequest(id.toString());
  }

  public createEvent(params: CreateEventType) {
    return this.api?.makeAPIPostRequest('', {
      body: params,
    });
  }

  public updateEvent(id: ResourceIdentifier, params: UpdateEventType) {
    return this.api?.makeAPIPutRequest(id.toString(), {
      body: params,
    });
  }

  public deleteEvent(id: ResourceIdentifier) {
    return this.api?.makeAPIDeleteRequest(id.toString());
  }
}
