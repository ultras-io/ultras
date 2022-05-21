import { ThemeInterface } from 'styled-components';
import { SizeEnum as AvatarSize } from 'views/components/base/Avatar';
import { FanClubViewModel } from '@ultras/core-api-sdk';

export interface IFanClubCardProps {
  theme?: ThemeInterface;
  onPress: () => void;
  data: FanClubViewModel;
  avatarSize?: AvatarSize;
  direction?: 'vertical' | 'horizontal';
}
