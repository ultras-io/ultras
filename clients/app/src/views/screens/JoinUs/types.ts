import { InterfaceTextProps } from 'native-base/lib/typescript/components/primitives/Text/types';

export type Message = {
  text: string | ((phoneNumber: string) => string);
  textProps?: InterfaceTextProps;
  jumpToStep?: number;
};

export type Answer = {};

export type ChatRow = {
  id: string;
  type: 'message' | 'answer';
  data: Message | Answer;
};
