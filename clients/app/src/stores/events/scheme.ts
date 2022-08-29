import { SchemeInterface } from '../generateCRUD/types/scheme';

export const scheme: SchemeInterface = {
  title: {
    initialValue: '',
  },
  dateTime: {
    initialValue: new Date(),
  },
  isEndDateTime: { initialValue: false },
  endDateTime: {
    initialValue: new Date(),
  },
  locationName: { initialValue: '' },
  content: { initialValue: '' },
};
