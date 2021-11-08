import {RouteProp} from '@react-navigation/native';

export interface ISupportersClubProps {
  route: RouteProp<{params: {tabName: string; id: string}}, 'params'>;
}

export interface ISupportersClubContainerProps {
  id: string;
}

export interface ISupportersClubComponentProps {
  data: any;
}
