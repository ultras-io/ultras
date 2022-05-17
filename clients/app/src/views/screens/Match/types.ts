import { RouteProp } from '@react-navigation/native';
import { MatchViewModel } from '@ultras/core-api-sdk';

export interface IMatchProps {
  route: RouteProp<{ params: { tabName: string; data: MatchViewModel } }, 'params'>;
}

export interface IMatchContainerProps {
  data: MatchViewModel;
}

export interface IMatchComponentProps {
  data: MatchViewModel;
}
