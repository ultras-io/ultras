import { EventPrivacyEnum } from '@ultras/utils';
import { MultiResourceIdentifier } from '../types';

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
  locationName: string;
  locationLat?: Nullable<number>;
  locationLng?: Nullable<number>;
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
