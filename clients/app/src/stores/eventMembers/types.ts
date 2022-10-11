import type { EventMemberViewModel, GetEventMembersFilter } from '@ultras/core-api-sdk';
import type {
  Filterable,
  FullFilterable,
  IInitStoreParams,
} from '../generateCRUD';

export type ParamType = IInitStoreParams<EventMemberViewModel>;
export type FilterType = Filterable<GetEventMembersFilter>;

export type TCreateEventMember = {
  eventId: ResourceIdentifier;
};

export type TDeleteEventMember = {
  eventId: ResourceIdentifier;
};

export interface LoadAllParams extends FullFilterable<GetEventMembersFilter> {
  eventId: number;
}
