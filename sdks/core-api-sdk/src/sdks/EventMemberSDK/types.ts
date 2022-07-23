import type { BaseUserViewModel } from '@ultras/view-models';
import type { ApiResponseBodyType, ListResponseMetaType } from '../types';

export type GetEventMembersFilter = {
  search?: string;
};

export type GetEventMembersResponse = ApiResponseBodyType<
  Array<{
    id: ResourceIdentifier;
    user: BaseUserViewModel;
  }>,
  ListResponseMetaType
>;
