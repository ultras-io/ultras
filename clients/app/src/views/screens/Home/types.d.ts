import { NavigationScreen } from 'views/navigation/types';
import { MatchViewModel } from '@ultras/core-api-sdk';

export interface IMatchesContainerProps {}

export type HomeNavigationScreens = {
  home: NavigationScreen;
};

export interface IMatchesComponentProps {
  data: Array<MatchViewModel>;
}

export interface IAddActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
}
