import { EventPrivacyEnum } from '@ultras/utils';
import { LocationViewModel } from '..';
import { PostViewModel } from './post';

export type EventViewModel = ViewModel<{
  post: PostViewModel;
  dateTime: Date;
  privacy: EventPrivacyEnum;
  location: LocationViewModel;
}>;

export type EventsViewModel = Array<EventViewModel>;
