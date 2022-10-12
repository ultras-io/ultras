import { FanClubPrivacyEnum } from '@ultras/utils';
import {
  ControllerResultType,
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
  ResourceIdentifier,
} from 'types';
import { FanClubAttributes } from 'core/data/models/FanClub';

interface IFanClubsFilter {
  name?: string;
  countryId?: ResourceIdentifier;
  cityId?: ResourceIdentifier;
  teamId?: ResourceIdentifier;
  userId?: ResourceIdentifier;
}

export type FanClubCreateParams = {
  ownerId: ResourceIdentifier;
  shortName: string;
  name: string;
  description: string | null;
  cityId: ResourceIdentifier;
  teamId: ResourceIdentifier;
  avatar: string;
  coverPhoto: string | null;
  privacy: FanClubPrivacyEnum;
};

export type FanClubCreateResult = ControllerResultType<FanClubAttributes>;

export type FanClubUpdateParams = {
  id: ResourceIdentifier;
  shortName?: string;
  name?: string;
  description?: string | null;
  cityId?: ResourceIdentifier;
  avatar?: string;
  coverPhoto?: string | null;
  privacy?: FanClubPrivacyEnum;
};

export type FanClubUpdateResult = ControllerResultType<{
  fanClub?: FanClubAttributes;
}>;

export type FanClubsListParams = ControllerListParamsType<IFanClubsFilter>;
export type FanClubsListResult = ControllerListResultType<FanClubAttributes>;
export type FanClubByIdResult = ControllerByIdResultType<FanClubAttributes>;
export type FanClubsInjectDataResult = ControllerInjectionResultType;
