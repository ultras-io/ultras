import { CreateEventType } from '@ultras/core-api-sdk';

export interface ICreateEventComponentProps {
  loading: boolean;
  isValid: boolean;
  data: any;
  setFieldValue: (
    fieldKey: keyof CreateEventType,
    fieldValue: CreateEventType[keyof CreateEventType]
  ) => void;
  onCreatePress: () => void;
}

export interface ISelectedMatchProps {
  matchId: ResourceIdentifier;
  onRemoveMatchPress(): void;
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

export interface IChoosePhotoComponentProps {
  title: string;
  onUploadStarted?(): void;
  onUploadCompleted?(): void;
}
