import { StyleProp, TextStyle } from 'react-native';

import { ColorKey } from 'themes/types';

export interface IUltrasTextProps {
  children: React.ReactNode;

  color?: ColorKey;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}
