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
  image: null | string;
}

function buildDateInstance(addHours = 0) {
  const date = new Date();
  const oneHour = 1000 * 3600;

  date.setTime(date.getTime() + oneHour * addHours);
  return date;
}

export const scheme: IScheme<IDataType> = {
  matchId: {
    initialValue: null,
    validate({ valueOriginal }) {
      if (!valueOriginal || valueOriginal > 0) {
        return [];
      }

      return ['invalid_match_id'];
    },
  },
  title: {
    initialValue: '',
    validate({ valueOriginal }) {
      if (!valueOriginal) {
        return ['title_required'];
      }

      return [];
    },
  },
  privacy: {
    initialValue: EventPrivacyEnum.public,
    validate({ valueOriginal }) {
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
    initialValue: () => {
      return buildDateInstance(1);
    },
    validate({ valueOriginal }) {
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
    initialValue: () => {
      return buildDateInstance(2);
    },
    validate({ valueOriginal, getState }) {
      const isEndDateTime = getState().isEndDateTime.valueOriginal;
      if (!isEndDateTime) {
        return [];
      }

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
    validate({ valueOriginal }) {
      if (!valueOriginal || valueOriginal.length > 3) {
        return [];
      }

      return ['invalid_location'];
    },
  },
  content: {
    initialValue: null,
    validate({ valueOriginal }) {
      if (!valueOriginal || valueOriginal.length > 0) {
        return [];
      }

      return ['invalid_content'];
    },
  },
  image: {
    initialValue: null,
  },
};
