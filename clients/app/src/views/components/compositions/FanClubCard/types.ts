import { FanClubViewModel } from '@ultras/core-api-sdk';

export interface IFanClubCardProps {
  onPress: () => void;
  data: FanClubViewModel;
  direction?: 'vertical' | 'horizontal';
}
