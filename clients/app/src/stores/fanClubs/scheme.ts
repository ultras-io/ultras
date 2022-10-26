import { FanClubPrivacyEnum } from '@ultras/utils';
import { IScheme } from '../generateCRUD/types/scheme';

export interface IDataType {
  name: string;
  shortName: string;
  teamId: null | ResourceIdentifier;
  cityId: null | ResourceIdentifier;
  privacy: FanClubPrivacyEnum;
  description: null | string;
  avatar: string;
  coverPhoto: null | string;
}

export const scheme: IScheme<IDataType> = {
  teamId: {
    initialValue: null,
    validate(valueOriginal: null | ResourceIdentifier) {
      if (!valueOriginal) {
        return ['team_id_required'];
      }
      if (valueOriginal > 0) {
        return [];
      }

      return ['invalid_team_id'];
    },
  },
  cityId: {
    initialValue: null,
    validate(valueOriginal: null | ResourceIdentifier) {
      if (!valueOriginal) {
        return ['city_id_required'];
      }
      if (valueOriginal > 0) {
        return [];
      }

      return ['invalid_city_id'];
    },
  },
  name: {
    initialValue: '',
    validate(valueOriginal: null | string) {
      if (!valueOriginal) {
        return ['name_required'];
      }
      return [];
    },
  },
  shortName: {
    initialValue: '',
    validate(valueOriginal: null | string) {
      if (!valueOriginal) {
        return ['short_name_required'];
      }
      return [];
    },
  },
  privacy: {
    initialValue: FanClubPrivacyEnum.public,
    validate(valueOriginal: null | string) {
      if (!valueOriginal) {
        return ['privacy_required'];
      }
      if (
        valueOriginal !== FanClubPrivacyEnum.public &&
        valueOriginal !== FanClubPrivacyEnum.private
      ) {
        return ['unknown_privacy'];
      }
      return [];
    },
  },
  description: {
    initialValue: null,
    validate(valueOriginal: null | string) {
      if (!valueOriginal || valueOriginal.length > 15) {
        return [];
      }

      return ['invalid_description'];
    },
  },

  avatar: {
    initialValue: null,
    validate(valueOriginal: null | string) {
      if (!valueOriginal) {
        return ['avatar_required'];
      }

      return [];
    },
  },
  coverPhoto: {
    initialValue: null,
  },
};
