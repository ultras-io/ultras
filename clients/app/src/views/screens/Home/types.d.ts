import {ThemeInterface} from 'styled-components';

export interface IHomeProps {}

export interface ISupportersClubsContainerProps {
  theme?: ThemeInterface;
}

export interface ISupportersClubsComponentProps {
  data: Array<any>; //@TODO
  onEndReached: () => void;
}
