import { StyleProp, TextStyle } from 'react-native';
import { ThemeInterface } from 'styled-components';
import { ColorKey } from 'themes/styled';

export interface IUltrasTextProps {
  children: React.ReactNode;
  theme?: ThemeInterface;
  color?: ColorKey;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}
