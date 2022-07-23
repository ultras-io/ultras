import { RoomPrivacyEnum } from '@ultras/utils';
import type { RoomsViewModel, RoomViewModel } from '@ultras/view-models';
import type {
  ApiResponseBodyType,
  ListResponseMetaType,
  MultiResourceIdentifier,
} from '../types';

export type GetRoomsFilter = {
  search?: string;
  fanClubId?: MultiResourceIdentifier;
  authorId?: MultiResourceIdentifier;
};

export type CreateRoomType = {
  authorId: ResourceIdentifier;
  title: string;
  content: string;
  fanClubId?: ResourceIdentifier;
  privacy: RoomPrivacyEnum;
};

export type UpdateRoomType = {
  title: string;
  content: string;
  privacy: RoomPrivacyEnum;
};

export type GetRoomsResponse = ApiResponseBodyType<RoomsViewModel, ListResponseMetaType>;
export type GetRoomResponse = ApiResponseBodyType<RoomViewModel>;
export type CreateRoomResponse = ApiResponseBodyType<RoomViewModel>;
export type UpdateRoomResponse = ApiResponseBodyType<RoomViewModel>;
