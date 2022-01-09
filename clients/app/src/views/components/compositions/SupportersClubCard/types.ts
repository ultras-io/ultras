import { ThemeInterface } from 'styled-components';
import { SizeEnum as AvatarSize } from 'views/components/base/Avatar';

export interface ISupportersClubCardProps {
  theme?: ThemeInterface;
  avatarUri: string;
  avatarSize: AvatarSize;
  name: string;
  ultrasCount: number;
  city?: string;
  direction?: 'vertical' | 'horizontal';
  onPress: () => void;
}
