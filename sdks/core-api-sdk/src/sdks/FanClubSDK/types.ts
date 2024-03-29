import { FanClubPrivacyEnum } from '@ultras/utils';
import type { FanClubsViewModel, FanClubViewModel } from '@ultras/view-models';
import type { ApiResponseBodyType, ListResponseMetaType } from '../types';
import type { ResourceIdentifier, MultiResourceIdentifier } from '../types';

export type GetFanClubsFilter = {
  name?: string;
  cityId?: MultiResourceIdentifier;
  countryId?: MultiResourceIdentifier;
  teamId?: MultiResourceIdentifier;
};

export type FanClubCreateType = {
  name: string;
  shortName: string;
  description: string | null;
  cityId: ResourceIdentifier;
  teamId: ResourceIdentifier;
  avatar: string;
  coverPhoto: string | null;
  privacy: FanClubPrivacyEnum;
};

export type FanClubUpdateType = Partial<Omit<FanClubCreateType, 'teamId'>>;

export type GetFanClubsResponse = ApiResponseBodyType<
  FanClubsViewModel,
  ListResponseMetaType
>;
export type GetFanClubResponse = ApiResponseBodyType<FanClubViewModel>;
export type CreateFanClubResponse = ApiResponseBodyType<FanClubViewModel>;
export type UpdateFanClubResponse = ApiResponseBodyType<FanClubViewModel>;
