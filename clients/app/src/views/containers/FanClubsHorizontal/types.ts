import { FanClubViewModel } from '@ultras/core-api-sdk';

export type ContainerType = 'discover' | 'my' | 'otherUser';

export interface IFanClubsContainerProps {
  data?: Array<FanClubViewModel>;
  type?: ContainerType;
}

export interface IFanClubsComponentProps {
  data: Array<FanClubViewModel>;
  type: ContainerType;
  onEndReached: () => void;
}

export interface IFanClubsLoaderProps {
  type: ContainerType;
}
