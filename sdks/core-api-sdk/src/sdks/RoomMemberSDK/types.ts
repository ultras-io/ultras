import type { RoomMembersViewModel } from '@ultras/view-models';
import type { ApiResponseBodyType, ListResponseMetaType } from '../types';

export type GetRoomMembersFilter = {
  search?: string;
};

export type GetRoomMembersResponse = ApiResponseBodyType<
  RoomMembersViewModel,
  ListResponseMetaType
>;
