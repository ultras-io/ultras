import { ThemeInterface } from 'styled-components';
import { FanClubViewModel } from '@ultras/core-api-sdk';

export interface IFanClubCardProps {
  theme?: ThemeInterface;
  onPress: () => void;
  data: FanClubViewModel;
  direction?: 'vertical' | 'horizontal';
}
