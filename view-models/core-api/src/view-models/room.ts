import { RoomPrivacyEnum } from '@ultras/utils';
import { PostViewModel } from './post';

export type RoomViewModel = ViewModel<{
  post: PostViewModel;
  privacy: RoomPrivacyEnum;
}>;

export type RoomsViewModel = Array<RoomViewModel>;
