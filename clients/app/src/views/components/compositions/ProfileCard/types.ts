import { ThemeInterface } from 'styled-components';

export interface IProfileCardProps {
  theme?: ThemeInterface;
  avatarUri: string;
  name: string;
  username: string;
  appearence?: 'minimal' | undefined;
  onPress: () => void;
}
