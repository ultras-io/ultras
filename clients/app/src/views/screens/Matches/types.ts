import {ThemeInterface} from 'styled-components';

export interface IMatchesProps {}
export interface IMatchesContainerProps {
  theme?: ThemeInterface;
}
export interface IMatchesComponentProps {
  data: Array<any>; //@TODO
  onEndReached: () => void;
}
