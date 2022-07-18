import { RouteProp } from '@react-navigation/native';
import { UserViewModel, TeamsViewModel } from '@ultras/view-models';
import { ResourceIdentifier } from '@ultras/core-api-sdk';

export interface IProfileProps {
  route: RouteProp<{ params: { tabName: string; id?: string } }, 'params'>;
}

export interface IProfileContainerProps {
  useStore: any;
  id?: ResourceIdentifier;
}

export interface IProfileComponentProps {
  data: UserViewModel;
}

export interface IProfileInfoProps {
  data: UserViewModel;
}

export interface ITeamsContainerProps {
  id?: ResourceIdentifier;
}

export interface ITeamsComponentProps {
  data: TeamsViewModel;
}

export interface IMenuActionSheetProps {
  useStore: any;
  isOpen: boolean;
  onClose: () => void;
}
