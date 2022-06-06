import { ThemeInterface } from 'styled-components';
import { FanClubViewModel } from '@ultras/core-api-sdk';

export interface IFanClubsContainerProps {
  theme?: ThemeInterface;
  showHeaderButton?: boolean;
  withBounce?: boolean;
}

export interface IFanClubsComponentProps {
  data: Array<FanClubViewModel>;
  showHeaderButton: boolean;
  withBounce: boolean;
  onEndReached: () => void;
}
