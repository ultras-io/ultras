import { StyleProp, ViewStyle } from 'react-native';
//
import { ColorKey } from 'themes/types';

export interface IBoxProps {
  // theme: ThemeInterface;
  bgColor?: ColorKey;
  borderColor?: ColorKey;
  style?: StyleProp<ViewStyle>;
}
