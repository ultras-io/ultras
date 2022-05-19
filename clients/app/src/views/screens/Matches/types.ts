import { ThemeInterface } from 'styled-components';
import { MatchViewModel } from '@ultras/view-models';

export interface IMatchesProps {}
export interface IMatchesContainerProps {
  theme?: ThemeInterface;
}
export interface IMatchesComponentProps {
  data: Array<MatchViewModel>;
  onEndReached: () => void;
}
