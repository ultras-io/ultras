import { InterfaceTextProps } from 'native-base/lib/typescript/components/primitives/Text/types';

export interface IJoinUsComponentProps {
  data: ChatRow[];
  useStore: any;
}

export type Message = {
  text: string | ((phoneNumber: string) => string);
  textProps?: InterfaceTextProps;
  jumpToStep?: number;
  availableBefore?: number;
  pressable?: boolean;
  change?: boolean;
};

type AnswerType =
  | 'button'
  | 'selectTeam'
  | 'emailOrphone'
  | '4digits'
  | 'username'
  | 'notification'
  | 'location'
  | 'success';

export type AnswerPost = {
  text?: string | ((phoneNumber: string) => string);
  textProps?: InterfaceTextProps;
  description?: string;
  pressable?: boolean;
};

export type Answer = {
  type: AnswerType;
  pre: {
    text?: string;
  };
  post: {
    confirmed: AnswerPost[];
    denied: AnswerPost[];
  };
};

export type ChatRowMessage = {
  key: string;
  type: 'message';
  data: Message[][];
};

export type ChatRowAnswer = {
  key: string;
  type: 'answer';
  data: Answer & { id: number };
};

export type ChatRowEmpty = {
  key: string;
  type: 'empty';
};

export type ChatRow = ChatRowMessage | ChatRowAnswer | ChatRowEmpty;

export interface ILeftMessageProps {
  item: ChatRowMessage;
  useStore: any;
}
export interface IRightMessageProps {
  messages: AnswerPost[];
  onPress?: () => void;
  text: string;
  confirmed: boolean;
}

export interface IJoinUsButtonProps {
  onPress?: () => void;
  text?: string;
}

export interface IEmailOrPhoneProps {
  useStore: any;
  onModalOpen: () => void;
}

export interface IFourDigitsProps {
  useStore: any;
}

export interface IFourDigitsMessageProps {
  useStore: any;
}
