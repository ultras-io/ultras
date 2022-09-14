import { SchemeInterface } from '../generateCRUD/types/scheme';

interface DataTypeInterface {
  title: string;
  isEndDateTime: boolean;
}

export const scheme: SchemeInterface<DataTypeInterface> = {
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
