import { EventPrivacyEnum } from '@ultras/utils';
import { EventViewModel } from '@ultras/view-models';

import {
  ControllerResultType,
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ResourceIdentifier,
} from 'types';

interface EventsFilterInterface {
  search?: string;
  fanClubId?: ResourceIdentifier;
  matchId?: ResourceIdentifier;
  authorId?: ResourceIdentifier;
}

export type EventCreateParams = {
  authorId: ResourceIdentifier;
  title: string;
  content: string;
  fanClubId?: ResourceIdentifier;
  matchId?: ResourceIdentifier;
  privacy: EventPrivacyEnum;
  dateTime: Date;
  locationName: string;
  locationLat?: Nullable<number>;
  locationLng?: Nullable<number>;
};

export type EventUpdateParams = {
  id: ResourceIdentifier;
  title: string;
  content: string;
  privacy: EventPrivacyEnum;
  dateTime: Date;
  locationName: string;
  locationLat?: Nullable<number>;
  locationLng?: Nullable<number>;
};

export type EventDeleteParams = {
  id: ResourceIdentifier;
  authorId: string;
};

export type EventCreateResult = ControllerResultType<EventViewModel>;
export type EventUpdateResult = ControllerResultType<EventViewModel>;

export type EventsListParams = ControllerListParamsType<EventsFilterInterface>;
export type EventsListResult = ControllerListResultType<EventViewModel>;
export type EventByIdResult = ControllerByIdResultType<EventViewModel>;
