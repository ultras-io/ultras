import { RoomPrivacyEnum } from '@ultras/utils';
import { RoomViewModel } from '@ultras/view-models';

import {
  ControllerResultType,
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ResourceIdentifier,
} from 'types';

interface IRoomsFilter {
  userId: ResourceIdentifier;
  search?: string;
  fanClubId?: ResourceIdentifier;
  matchId?: ResourceIdentifier;
  authorId?: ResourceIdentifier;
}

export type RoomCreateParams = {
  authorId: ResourceIdentifier;
  title: string;
  content: string;
  fanClubId: ResourceIdentifier;
  dateTime: Date;
  privacy: RoomPrivacyEnum;
};

export type RoomUpdateParams = {
  id: ResourceIdentifier;
  title: string;
  content: string;
  dateTime: Date;
  privacy: RoomPrivacyEnum;
};

export type RoomDeleteParams = {
  id: ResourceIdentifier;
  authorId: string;
};

export type RoomCreateResult = ControllerResultType<RoomViewModel>;
export type RoomUpdateResult = ControllerResultType<RoomViewModel>;

export type RoomsListParams = ControllerListParamsType<IRoomsFilter>;
export type RoomsListResult = ControllerListResultType<RoomViewModel>;
export type RoomByIdParams = {
  id: ResourceIdentifier;
  userId?: null | ResourceIdentifier;
};
export type RoomByIdResult = ControllerByIdResultType<RoomViewModel>;
