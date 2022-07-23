import type { BaseUserViewModel } from '@ultras/view-models';
import type { ApiResponseBodyType, ListResponseMetaType } from '../types';

export type GetRoomMembersFilter = {
  search?: string;
};

export type GetRoomMembersResponse = ApiResponseBodyType<
  Array<{
    id: ResourceIdentifier;
    user: BaseUserViewModel;
  }>,
  ListResponseMetaType
>;
