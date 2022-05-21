import { RouteProp } from '@react-navigation/native';
import { FanClubViewModel } from '@ultras/core-api-sdk';

export interface IFanClubProps {
  route: RouteProp<{ params: { tabName: string; data: FanClubViewModel } }, 'params'>;
}

export interface IFanClubContainerProps {
  data: FanClubViewModel;
}

export interface IFanClubComponentProps {
  data: FanClubViewModel;
}
