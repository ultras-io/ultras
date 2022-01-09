import { RouteProp } from '@react-navigation/native';

export interface ITeamProps {
  route: RouteProp<{ params: { tabName: string; id: string } }, 'params'>;
}

export interface ITeamContainerProps {
  id: string;
}

export interface ITeamComponentProps {
  data: any;
}
