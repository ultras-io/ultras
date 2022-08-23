import { CreateEventType } from '@ultras/core-api-sdk';

export interface ICreateEventComponentProps {
  data: any;
  setFieldValue: (
    fieldKey: keyof CreateEventType,
    fieldValue: CreateEventType[keyof CreateEventType]
  ) => void;
}
