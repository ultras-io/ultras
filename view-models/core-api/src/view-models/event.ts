import { EventPrivacyEnum } from '@ultras/utils';
import { PostViewModel } from './post';

export type EventViewModel = ViewModel<{
  post: PostViewModel;

  dateTime: Date;
  privacy: EventPrivacyEnum;
  locationName: string;
  locationLat: Nullable<number>;
  locationLng: Nullable<number>;
}>;

export type EventsViewModel = Array<EventViewModel>;
