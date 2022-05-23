import { StyleProp, TextStyle } from 'react-native';
import { ThemeInterface } from 'styled-components';
import { ColorKey } from 'themes/types';

export interface IUltrasTextProps {
  children: React.ReactNode;
  theme?: ThemeInterface;
  color?: ColorKey;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}
