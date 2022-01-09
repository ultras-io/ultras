import { RouteProp } from '@react-navigation/native';

export interface IEventProps {
  route: RouteProp<{ params: { tabName: string; id: string } }, 'params'>;
}

export interface IEventContainerProps {
  id: string;
}

export interface IEventComponentProps {
  data: any;
}
