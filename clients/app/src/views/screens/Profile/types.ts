import { RouteProp } from '@react-navigation/native';
import { UserViewModel } from '@ultras/view-models';

export interface IProfileProps {
  route: RouteProp<{ params: { tabName: string; id?: string } }, 'params'>;
}

export interface IProfileContainerProps {
  useStore: any;
  id?: string;
}

export interface IProfileComponentProps {
  data: UserViewModel;
}

export interface IProfileInfoProps {
  data: UserViewModel;
}

export interface IMenuActionSheetProps {
  useStore: any;
  isOpen: boolean;
  onClose: () => void;
}
