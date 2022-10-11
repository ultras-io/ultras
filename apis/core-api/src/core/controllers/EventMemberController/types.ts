import { EventPrivacyEnum } from '@ultras/utils';
import { EventViewModel } from '@ultras/view-models';

import {
  ControllerResultType,
  ControllerListParamsType,
  ControllerListResultType,
  ResourceIdentifier,
} from 'types';

interface IEventMembersFilter {
  search?: string;
  eventId: ResourceIdentifier;
}

export type EventMemberCreateParams = {
  eventId: ResourceIdentifier;
  userId: ResourceIdentifier;
};

export type EventMemberDeleteParams = {
  eventId: ResourceIdentifier;
  userId: ResourceIdentifier;
};

export type EventMemberCreateResult = ControllerResultType<EventViewModel>;

export type EventMembersListParams = ControllerListParamsType<IEventMembersFilter>;
export type EventMembersListResult = ControllerListResultType<EventViewModel>;
