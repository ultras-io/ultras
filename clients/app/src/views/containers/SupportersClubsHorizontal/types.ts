import {ThemeInterface} from 'styled-components';
import {SizeEnum as AvatarSize} from 'views/components/base/Avatar';

export interface ISupportersClubsContainerProps {
  theme?: ThemeInterface;
  showHeaderButton?: boolean;
  avatarSize?: AvatarSize;
  data?: Array<any>; //@TODO
  withBounce?: boolean;
}

export interface ISupportersClubsComponentProps {
  data: Array<any>; //@TODO
  avatarSize: AvatarSize;
  withBounce: boolean;
  onPress: (id: string) => void;
  onEndReached: () => void;
}
