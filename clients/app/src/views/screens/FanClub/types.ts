import { RouteProp } from '@react-navigation/native';
import {
  FanClubViewModel,
  RoomViewModel,
  ResourceIdentifier,
} from '@ultras/core-api-sdk';

export interface IFanClubProps {
  route: RouteProp<{ params: { tabName: string; data: FanClubViewModel } }, 'params'>;
}

export interface IFanClubContainerProps {
  data: FanClubViewModel;
}

export interface IFanClubComponentProps {
  data: FanClubViewModel;
}

export interface IRoomsContainerProps {
  fanClubId: ResourceIdentifier;
}

export interface IRoomsComponentProps {
  data: Array<RoomViewModel>;
  onEndReached: () => void;
}

export interface IRoomCardProps {
  data: RoomViewModel;
  onPress: () => void;
}
