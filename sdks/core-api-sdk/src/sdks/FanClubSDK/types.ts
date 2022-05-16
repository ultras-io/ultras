import { FanClubPrivacyEnum } from '@ultras/utils';
import { FanClubsViewModel, FanClubViewModel } from '@ultras/view-models';
import { ApiResponseBodyType, ListResponseMetaType } from '../types';
import { ResourceIdentifier } from '../types';

export type GetFanClubsFilter = {
  name?: string;
  cityId?: ResourceIdentifier;
  countryId?: ResourceIdentifier;
  teamId?: ResourceIdentifier;
};

export type FanClubCreateType = {
  name: string;
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
