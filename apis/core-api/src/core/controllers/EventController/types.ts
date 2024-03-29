import { EventPrivacyEnum } from '@ultras/utils';
import { EventViewModel } from '@ultras/view-models';

import {
  ControllerResultType,
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ResourceIdentifier,
} from 'types';

interface IEventsFilter {
  userId: ResourceIdentifier;
  search?: string;
  fanClubId?: ResourceIdentifier;
  matchId?: ResourceIdentifier;
  authorId?: ResourceIdentifier;
  teamId?: ResourceIdentifier;
}

export type EventCreateParams = {
  authorId: ResourceIdentifier;
  title: string;
  content: string;
  fanClubId?: ResourceIdentifier;
  matchId?: ResourceIdentifier;
  image: Nullable<string>;
  privacy: EventPrivacyEnum;
  dateTime: Date;
  locationName: Nullable<string>;
  locationLat?: Nullable<number>;
  locationLng?: Nullable<number>;
};

export type EventUpdateParams = {
  id: ResourceIdentifier;
  title: string;
  content: string;
  privacy: EventPrivacyEnum;
  dateTime: Date;
  image: Nullable<string>;
  locationName: Nullable<string>;
  locationLat?: Nullable<number>;
  locationLng?: Nullable<number>;
};

export type EventDeleteParams = {
  id: ResourceIdentifier;
  authorId: string;
};

export type EventCreateResult = ControllerResultType<EventViewModel>;
export type EventUpdateResult = ControllerResultType<EventViewModel>;

export type EventsListParams = ControllerListParamsType<IEventsFilter>;
export type EventsListResult = ControllerListResultType<EventViewModel>;
export type EventByIdParams = {
  id: ResourceIdentifier;
  userId?: null | ResourceIdentifier;
};
export type EventByIdResult = ControllerByIdResultType<EventViewModel>;
