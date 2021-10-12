import {RouteProp} from '@react-navigation/native';

export interface IMatchProps {
  route: RouteProp<{params: {tabName: string; id: string}}, 'params'>;
}
