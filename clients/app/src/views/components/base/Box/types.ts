import { ThemeInterface } from 'styled-components';
import { ColorKey } from 'themes/types';

export interface IBoxProps {
  theme: ThemeInterface;
  bgColor?: ColorKey;
  borderColor?: ColorKey;
}
