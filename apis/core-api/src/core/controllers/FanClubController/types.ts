import { FanClubPrivacyEnum } from '@ultras/utils';
import {
  ControllerResultType,
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
  DbIdentifier,
} from 'types';
import { FanClubAttributes } from 'core/data/models/FanClub';

interface FanClubsFilterInterface {
  name?: string;
  countryId?: DbIdentifier;
  cityId?: DbIdentifier;
  teamId?: DbIdentifier;
}

export type FanClubCreateParams = {
  creatorId: DbIdentifier;
  name: string;
  description: string | null;
  cityId: DbIdentifier;
  teamId: DbIdentifier;
  avatar: string;
  coverPhoto: string | null;
  privacy: FanClubPrivacyEnum;
};

export type FanClubCreateResult = ControllerResultType<{
  fanClub?: FanClubAttributes;
}>;

export type FanClubUpdateParams = {
  id: DbIdentifier;
  name?: string;
  description?: string | null;
  cityId?: DbIdentifier;
  avatar?: string;
  coverPhoto?: string | null;
  privacy?: FanClubPrivacyEnum;
};

export type FanClubUpdateResult = ControllerResultType<{
  fanClub?: FanClubAttributes;
}>;

export type FanClubsListParams = ControllerListParamsType<FanClubsFilterInterface>;
export type FanClubsListResult = ControllerListResultType<FanClubAttributes>;
export type FanClubByIdResult = ControllerByIdResultType<FanClubAttributes>;
export type FanClubsInjectDataResult = ControllerInjectionResultType;
