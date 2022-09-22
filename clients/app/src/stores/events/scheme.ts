import { EventPrivacyEnum } from '@ultras/utils';
import { SchemeInterface } from '../generateCRUD/types/scheme';

interface DataTypeInterface {
  matchId: null | ResourceIdentifier;
  title: string;
  privacy: EventPrivacyEnum;
  isEndDateTime: boolean;
  dateTime: Date;
  endDateTime: null | Date;
  locationName: null | string;
  content: null | string;
}

export const scheme: SchemeInterface<DataTypeInterface> = {
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
  },
  privacy: {
    initialValue: EventPrivacyEnum.public,
  },
  dateTime: {
    initialValue: new Date(),
  },
  isEndDateTime: {
    initialValue: false,
  },
  endDateTime: {
    initialValue: new Date(),
    validate(valueOriginal: null | Date) {
      if (!valueOriginal || valueOriginal instanceof Date) {
        // @TODO: validate date not in past
        return [];
      }

      return ['invalid_end_date'];
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
