import { CreateEventType } from '@ultras/core-api-sdk';

export interface ICreateEventComponentProps {
  data: any;
  setFieldValue: (
    fieldKey: keyof CreateEventType,
    fieldValue: CreateEventType[keyof CreateEventType]
  ) => void;
}

export interface IDateAndTimeRowsProps {
  dateTime: Date;
  dateTitle: string;
  timeTitle: string;
  onChange: (value?: Date) => void;
  description?: string;
  withSwitch?: boolean;
  switchTitle?: string;
  switchValue?: boolean;
  onSwitchChange?: (value?: boolean) => void;
}
