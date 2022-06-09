import { InterfaceTextProps } from 'native-base/lib/typescript/components/primitives/Text/types';

export type Message = {
  text: string | ((phoneNumber: string) => string);
  textProps?: InterfaceTextProps;
  jumpToStep?: number;
};

type AnswerType =
  | 'button'
  | 'selectTeam'
  | 'phoneNumber'
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

export type ChatRow = ChatRowMessage | ChatRowAnswer;

export interface ILeftMessageProps {
  item: ChatRowMessage;
  jumpToStep: (st: number) => void;
  phoneNumber: string;
}
export interface IRightMessageProps {
  messages: AnswerPost[];
  onPress?: () => void;
  text: string;
  confirmed: boolean;
}
