import { EventPrivacyEnum } from '@ultras/utils';
import { IScheme } from '../generateCRUD/types/scheme';

interface IDataType {
  matchId: null | ResourceIdentifier;
  title: string;
  privacy: EventPrivacyEnum;
  isEndDateTime: boolean;
  dateTime: Date;
  endDateTime: null | Date;
  locationName: null | string;
  content: null | string;
}

export const scheme: IScheme<IDataType> = {
  matchId: {
    initialValue: null,
    validate(valueOriginal: null | ResourceIdentifier) {
      if (!valueOriginal || valueOriginal > 0) {
        return [];
      }

      return ['invalid_match_id'];
    },
  },
  title: {
    initialValue: '',
    validate(valueOriginal: null | string) {
      if (!valueOriginal) {
        return ['title_required'];
      }

      return [];
    },
  },
  privacy: {
    initialValue: EventPrivacyEnum.public,
    validate(valueOriginal: null | string) {
      if (!valueOriginal) {
        return ['privacy_required'];
      }
      if (
        valueOriginal !== EventPrivacyEnum.public &&
        valueOriginal !== EventPrivacyEnum.private
      ) {
        return ['unknown_privacy'];
      }

      return [];
    },
  },
  dateTime: {
    initialValue: new Date(),
    validate(valueOriginal: null | Date | string) {
      if (!valueOriginal) {
        return ['start_datetime_required'];
      }

      const date =
        valueOriginal instanceof Date ? valueOriginal : new Date(valueOriginal);

      const currentTimestamp = Date.now();
      if (currentTimestamp > date.getTime()) {
        return ['start_datetime_past'];
      }

      return [];
    },
  },
  isEndDateTime: {
    initialValue: false,
  },
  endDateTime: {
    initialValue: new Date(),
    validate(valueOriginal: null | Date | string) {
      if (!valueOriginal) {
        return [];
      }

      const date =
        valueOriginal instanceof Date ? valueOriginal : new Date(valueOriginal);

      const currentTimestamp = Date.now();
      if (currentTimestamp > date.getTime()) {
        return ['end_datetime_past'];
      }

      return [];
    },
  },
  locationName: {
    initialValue: null,
    validate(valueOriginal: null | string) {
      if (!valueOriginal || valueOriginal.length > 3) {
        return [];
      }

      return ['invalid_location'];
    },
  },
  content: {
    initialValue: null,
    validate(valueOriginal: null | string) {
      if (!valueOriginal || valueOriginal.length > 15) {
        return [];
      }

      return ['invalid_content'];
    },
  },
};
