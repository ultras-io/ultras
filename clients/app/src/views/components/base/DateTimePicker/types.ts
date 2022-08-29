import { DateTimePickerEvent } from '@react-native-community/datetimepicker/src/types';

export interface IDatePickerProps {
  text: string;
  value: Date;
  onChange?: (event: DateTimePickerEvent, date?: Date | undefined) => void;
}
