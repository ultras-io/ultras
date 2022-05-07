import { ThemeInterface } from 'styled-components';
import { NavigationScreen } from 'views/navigation/types';

export interface IHomeProps {}

export interface IMatchesContainerProps {
  theme?: ThemeInterface;
}

export type HomeNavigationScreens = {
  home: NavigationScreen;
};

export interface IMatchesComponentProps {
  data: Array<any>; //@TODO
  onEndReached: () => void;
}
