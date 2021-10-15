import {ThemeInterface} from 'styled-components';

export interface ISupportersClubCardProps {
  theme?: ThemeInterface;
  avatarUri: string;
  name: string;
  ultrasCount: number;
  city: string;
  direction?: 'vertical' | 'horizontal';
}
