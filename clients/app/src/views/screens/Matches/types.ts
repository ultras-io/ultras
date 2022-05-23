import { ThemeInterface } from 'styled-components';
import { MatchViewModel } from '@ultras/view-models';
import { RouteProp } from '@react-navigation/native';

export interface IMatchesProps {}
export interface IMatchesContainerProps {
  theme?: ThemeInterface;
  route: RouteProp<{ params: { tabName: string; teamId: number } }, 'params'>;
}
export interface IMatchesComponentProps {
  data: Array<MatchViewModel>;
  onEndReached: () => void;
}
