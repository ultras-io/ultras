import { RouteProp } from '@react-navigation/native';
import { UserViewModel } from '@ultras/view-models';
import { TeamViewModel } from '@ultras/view-models';

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

export interface ITeamsContainerProps {
  id?: string;
}

export interface ITeamsComponentProps {
  data: Array<TeamViewModel>;
}

export interface IMenuActionSheetProps {
  useStore: any;
  isOpen: boolean;
  onClose: () => void;
}
