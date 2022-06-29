import { RouteProp } from '@react-navigation/native';
import { RoomViewModel } from '@ultras/core-api-sdk';

export interface IRoomProps {
  route: RouteProp<{ params: { tabName: string; data: RoomViewModel } }, 'params'>;
}

export interface IRoomContainerProps {
  data: RoomViewModel;
}

export interface IRoomComponentProps {
  data: RoomViewModel;
}
