import { RoomPrivacyEnum } from '@ultras/utils';
import { MultiResourceIdentifier } from '../types';

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
