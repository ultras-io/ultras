import { dataKeyType } from 'views/screens/SearchListModal/types';

export type StatusType = 'initial' | 'loading' | 'error' | 'success';

type ListItemType = {
  id?: string;
  name: string;
};

export type ListItemSelectType = ListItemType & {
  dataType: dataKeyType;
};

type JoinVia = {
  key: 'common-email' | 'common-phone';
  keyInvert: 'common-phone' | 'common-email';
  value: string;
  isEmail: boolean;
};

export interface IProps {
  status: StatusType;
  statusNext: StatusType;
  step: number;
  loginStep: boolean;
  token: string;
  userResponse: any;
  user: {
    team: ListItemType;
    country: ListItemType;
    joinVia: JoinVia;
    exists: boolean;
    isCodeValid: boolean;
    isUserNameValid: boolean;
    code: string;
    username: string;
    notificationsAllowed: boolean;
    locationEnabled: boolean;
  };
}

export interface IMethods {
  nextStep: () => void;
  toLoginStep: () => void;
  jumpToStep: (step: number) => void;
  setNotificationsAllowed: (allowed: boolean) => void;
  setLocationEnabled: (enabled: boolean) => void;
  setSelected: (data: ListItemSelectType) => void;
  switchJoinMethod: () => void;
  confirmIdentity: (value?: string) => void;
  verifyCode: (value: string) => void;
  checkUsername: (value: string) => void;
  login: () => any;
  register: () => void;
  clearStore: () => void;
}

export interface IState extends IProps, IMethods {}
