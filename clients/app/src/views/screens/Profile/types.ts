import { RouteProp } from '@react-navigation/native';
import { UserViewModel, TeamsViewModel } from '@ultras/view-models';

export interface IProfileProps {
  route: RouteProp<{ params: { tabName: string; data?: UserViewModel } }, 'params'>;
}

export interface IProfileContainerProps {
  data?: UserViewModel;
}

export interface IProfileComponentProps {
  data: UserViewModel;
}

export interface IProfileInfoProps {
  data: UserViewModel;
}

export interface ITeamsContainerProps {
  isMe: boolean;
  data?: UserViewModel;
}

export interface ITeamsComponentProps {
  data: TeamsViewModel;
}

export interface IMenuActionSheetProps {
  useStore: any;
  isOpen: boolean;
  onClose: () => void;
}
