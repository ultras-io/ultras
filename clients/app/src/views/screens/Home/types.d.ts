import {ThemeInterface} from 'styled-components';

export interface IHomeProps {}

export interface ISupportersClubsContainerProps {
  theme?: ThemeInterface;
}

export interface ISupportersClubsComponentProps {
  data: Array<any>; //@TODO
  onEndReached: () => void;
}

export interface IMatchesContainerProps {
  theme?: ThemeInterface;
}

export interface IMatchesComponentProps {
  data: Array<any>; //@TODO
  onEndReached: () => void;
}
