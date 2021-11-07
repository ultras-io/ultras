import {RouteProp} from '@react-navigation/native';

export interface IPostProps {
  route: RouteProp<{params: {tabName: string; id: string}}, 'params'>;
}

export interface IPostContainerProps {
  id: string;
}

export interface IPostComponentProps {
  data: any;
}
