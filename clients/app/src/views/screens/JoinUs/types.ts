import {DirectionENum} from 'views/components/base/WithAnimation';

export enum ActionTypeEnum {
  Button,
  Team,
  Phone,
  PhoneConfirm,
  UserName,
  AllowNotifications,
  AllowLocation,
  StartApp,
}

export enum MessageTypeEnum {
  Default,
  Phone,
  Location,
}

export type AnimationProp = {
  direction?: DirectionENum;
  delay?: number;
};

export type Message = {
  type: MessageTypeEnum;
  messageId: number;
  message?: React.ReactNode;
  messageRenderer?: (
    value: string,
    changeNumber: () => void,
    canChange: boolean,
  ) => React.ReactNode;
};

export type Action = {
  type: ActionTypeEnum;
  title?: string;
};

export type ScenarStep = {
  id: number;
  messages: Array<Message & AnimationProp>;
  action: Action & AnimationProp;
};

export interface IJoinUsProps {}
