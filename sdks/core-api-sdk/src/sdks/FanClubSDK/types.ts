import { FanClubPrivacyEnum } from '@ultras/utils';
import { FanClubsViewModel, FanClubViewModel } from '@ultras/view-models';
import { ApiResponseBodyType, ListResponseMetaType } from '../types';
import { DbIdentifier } from '../types';

export type GetFanClubsFilter = {
  name?: string;
  cityId?: DbIdentifier;
  countryId?: DbIdentifier;
  teamId?: DbIdentifier;
};

export type FanClubCreateType = {
  name: string;
  description: string | null;
  cityId: DbIdentifier;
  teamId: DbIdentifier;
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
