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
  key: 'email' | 'phone';
  keyInvert: 'phone' | 'email';
  value: string;
  isEmail: boolean;
};

export interface IProps {
  status: StatusType;
  step: number;
  user: {
    team: ListItemType;
    country: ListItemType;
    joinVia: JoinVia;
    eixsts: boolean;
    code: string;
    username: string;
    notificationsAllowed: boolean;
    locationEnabled: boolean;
  };
}

export interface IMethods {
  nextStep: () => void;
  jumpToStep: (step: number) => void;
  setSelected: (data: ListItemSelectType) => void;
  swicthJoinMethod: () => void;
  confirmIdentity: (value?: string) => void;
}

export interface IState extends IProps, IMethods {}
