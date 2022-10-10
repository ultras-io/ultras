import { FanClubPrivacyEnum } from '@ultras/utils';
import { SchemeInterface } from '../generateCRUD/types/scheme';

export interface DataTypeInterface {
  name: string;
  teamId: null | ResourceIdentifier;
  cityId: null | ResourceIdentifier;
  privacy: FanClubPrivacyEnum;
  description: null | string;
}

export const scheme: SchemeInterface<DataTypeInterface> = {
  teamId: {
    initialValue: null,
    validate(valueOriginal: null | ResourceIdentifier) {
      if (!valueOriginal || valueOriginal > 0) {
        return [];
      }

      return ['invalid_team_id'];
    },
  },
  cityId: {
    initialValue: null,
    validate(valueOriginal: null | ResourceIdentifier) {
      if (!valueOriginal || valueOriginal > 0) {
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
  privacy: {
    initialValue: FanClubPrivacyEnum.public,
    validate(valueOriginal: null | string) {
      const isValid =
        valueOriginal === FanClubPrivacyEnum.public ||
        valueOriginal === FanClubPrivacyEnum.private;

      if (!isValid) {
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
};
