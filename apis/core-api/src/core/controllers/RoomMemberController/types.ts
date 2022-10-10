import { RoomPrivacyEnum } from '@ultras/utils';
import { RoomViewModel } from '@ultras/view-models';

import {
  ControllerResultType,
  ControllerListParamsType,
  ControllerListResultType,
  ResourceIdentifier,
} from 'types';

interface IRoomMembersFilter {
  search?: string;
  roomId: ResourceIdentifier;
}

export type RoomMemberCreateParams = {
  roomId: ResourceIdentifier;
  userId: ResourceIdentifier;
};

export type RoomMemberDeleteParams = {
  roomId: ResourceIdentifier;
  userId: ResourceIdentifier;
};

export type RoomMemberCreateResult = ControllerResultType<RoomViewModel>;

export type RoomMembersListParams = ControllerListParamsType<IRoomMembersFilter>;
export type RoomMembersListResult = ControllerListResultType<RoomViewModel>;
