import { FanClubViewModel } from '@ultras/core-api-sdk';
import { ContainerType } from 'views/containers/FanClubsHorizontal';

export interface IFanClubCardProps {
  onPress: () => void;
  data: FanClubViewModel;
  direction?: 'vertical' | 'horizontal';
  type?: ContainerType;
}
