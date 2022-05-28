import { StyleProp, ViewStyle } from 'react-native';
import { ThemeInterface } from 'styled-components';

export interface IBluredViewProps {
  theme?: ThemeInterface;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
