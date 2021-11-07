import {RouteProp} from '@react-navigation/native';

export interface IProfileProps {
  route: RouteProp<{params: {tabName: string; id: string}}, 'params'>;
}

export interface IProfileContainerProps {
  id: string;
}

export interface IProfileComponentProps {
  data: any;
}
