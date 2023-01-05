import { EventPrivacyEnum } from '@ultras/utils';
import type { EventsViewModel, EventViewModel } from '@ultras/view-models';
import type {
  ApiResponseBodyType,
  ListResponseMetaType,
  MultiResourceIdentifier,
} from '../types';

export type GetEventsFilter = {
  search?: string;
  fanClubId?: MultiResourceIdentifier;
  matchId?: MultiResourceIdentifier;
  authorId?: MultiResourceIdentifier;
  teamId?: MultiResourceIdentifier;
};

export type CreateEventType = {
  authorId: ResourceIdentifier;
  title: string;
  content: string;
  fanClubId?: ResourceIdentifier;
  matchId?: ResourceIdentifier;
  privacy: EventPrivacyEnum;
  dateTime: Date;
  isEndDateTime: boolean;
  endDateTime: Date;
  locationName: string;
  locationLat?: Nullable<number>;
  locationLng?: Nullable<number>;
  image?: Nullable<string>;
};

export type UpdateEventType = {
  title: string;
  content: string;
  privacy: EventPrivacyEnum;
  dateTime: Date;
  locationName: string;
  locationLat?: Nullable<number>;
  locationLng?: Nullable<number>;
};

export type GetEventsResponse = ApiResponseBodyType<
  EventsViewModel,
  ListResponseMetaType
>;
export type GetEventResponse = ApiResponseBodyType<EventViewModel>;
export type CreateEventResponse = ApiResponseBodyType<EventViewModel>;
export type UpdateEventResponse = ApiResponseBodyType<EventViewModel>;
