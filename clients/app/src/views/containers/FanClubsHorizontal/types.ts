import { FanClubViewModel } from '@ultras/core-api-sdk';

export interface IFanClubsContainerProps {
  showHeaderButton?: boolean;
  withBounce?: boolean;
}

export interface IFanClubsComponentProps {
  data: Array<FanClubViewModel>;
  showHeaderButton: boolean;
  withBounce: boolean;
  onEndReached: () => void;
}
