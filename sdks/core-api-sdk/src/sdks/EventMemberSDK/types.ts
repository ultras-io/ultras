import type { EventMembersViewModel } from '@ultras/view-models';
import type { ApiResponseBodyType, ListResponseMetaType } from '../types';

export type GetEventMembersFilter = {
  search?: string;
};

export type GetEventMembersResponse = ApiResponseBodyType<
  EventMembersViewModel,
  ListResponseMetaType
>;
