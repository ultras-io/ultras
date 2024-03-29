import { MatchViewModel } from '@ultras/view-models';
import { RouteProp } from '@react-navigation/native';

export interface IMatchesContainerProps {
  route?: RouteProp<{ params: { tabName: string; teamId: number } }, 'params'>;
}
export interface IMatchesComponentProps {
  loading: boolean;
  data: Array<MatchViewModel>;
  onEndReached: () => void;
}
