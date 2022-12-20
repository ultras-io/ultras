import {
  AndroidNativeProps,
  IOSNativeProps,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

export interface OnChangeInterface {
  (event: DateTimePickerEvent, date?: Date | undefined): void;
}

export interface IDatePickerProps {
  autoclose?: boolean;
  text: string;
  value: Date;
  onChange?: OnChangeInterface;
}

type NativeProps = IOSNativeProps | AndroidNativeProps;
export type PickerWrapperProps = IDatePickerProps & NativeProps;
