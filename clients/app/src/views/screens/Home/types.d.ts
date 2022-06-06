import { ThemeInterface } from 'styled-components';
import { NavigationScreen } from 'views/navigation/types';
import { MatchViewModel } from '@ultras/core-api-sdk';

export interface IHomeProps {}

export interface IMatchesContainerProps {
  theme?: ThemeInterface;
}

export type HomeNavigationScreens = {
  home: NavigationScreen;
};

export interface IMatchesComponentProps {
  data: Array<MatchViewModel>;
}
