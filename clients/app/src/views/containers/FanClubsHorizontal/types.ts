import { FanClubViewModel } from '@ultras/core-api-sdk';

export interface IFanClubsContainerProps {
  type?: 'discover' | 'my';
}

export interface IFanClubsComponentProps {
  data: Array<FanClubViewModel>;
  type: 'discover' | 'my';
  onEndReached: () => void;
}

export interface IFanClubsLoaderProps {
  type: 'discover' | 'my';
}
