import { RouteProp } from '@react-navigation/native';
import { EventViewModel } from '@ultras/core-api-sdk';

export interface IEventProps {
  route: RouteProp<{ params: { tabName: string; data: EventViewModel } }, 'params'>;
}

export interface IEventContainerProps {
  data: EventViewModel;
}

export interface IEventComponentProps {
  data: EventViewModel;
}
