import {RouteProp} from '@react-navigation/native';

export interface IEventProps {
  route: RouteProp<{params: {tabName: string}}, 'params'>;
}
