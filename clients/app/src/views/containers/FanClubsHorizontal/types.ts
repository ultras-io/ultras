import { ThemeInterface } from 'styled-components';
import { SizeEnum as AvatarSize } from 'views/components/base/Avatar';
import { FanClubViewModel } from '@ultras/core-api-sdk';

export interface IFanClubsContainerProps {
  theme?: ThemeInterface;
  showHeaderButton?: boolean;
  withBounce?: boolean;
}

export interface IFanClubsComponentProps {
  data: Array<FanClubViewModel>;
  avatarSize: AvatarSize;
  withBounce: boolean;
  onEndReached: () => void;
}
