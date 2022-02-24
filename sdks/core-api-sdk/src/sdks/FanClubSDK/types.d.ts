import { FanClubPrivacyEnum } from '@ultras/utils';
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