import { InterfaceTextProps } from 'native-base/lib/typescript/components/primitives/Text/types';
import { dataKeyType } from 'views/screens/SearchListModal/types';

export interface IJounUsComponentProps {
  data: ChatRow[];
  stepProps: UseStepType;
  confirmIdentity: (isEmail: boolean, value: string) => void;
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
  step: number;
  jumpToStep: (st: number) => void;
  change: () => void;
  emailPhoneKey: string;
  emailPhoneKeyInvert: string;
  emailPhoneValue?: string;
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
  onPress: (isEmail: boolean, value: string) => void;
  onModalOpen: () => void;
  isEmail: boolean;
  emailPhoneKey: string;
  code: string;
}

export type UseStepType = [
  {
    step: number;
    nextStep: () => void;
    jumpToStep: (st: number) => void;
  },
  {
    userState: UserStateType;
    updateUser: (key: UserStateKeyType, value: UserStateValueType) => void;
  },
  {
    selectTeam: (team: SelectType) => void;
    selectCountryCode: (code: SelectType) => void;
  },
  {
    isEmail: boolean;
    emailPhoneKey: string;
    emailPhoneKeyInvert: string;
    emailPhoneValue?: string;
    swicthOther: () => void;
  }
];

export type UserStateKeyType =
  | 'phoneNumber'
  | 'email'
  | 'team'
  | 'countryCode'
  | 'code'
  | 'username'
  | 'notificationsAllowed'
  | 'locationEnabled';

export type UserStateValueType = TeamType | string | boolean | undefined;

export type UserStateType = {
  phoneNumber?: string;
  email?: string;
  team?: TeamType;
  countryCode?: TeamType;
  code?: string;
  username?: string;
  notificationsAllowed: boolean;
  locationEnabled: boolean;
};

export type TeamType = {
  id: string;
  name: string;
};

export type SelectType = TeamType & {
  dataType: dataKeyType;
};
