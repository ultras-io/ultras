import { ThemeInterface } from 'styled-components';
import { ColorKey } from 'themes/types';

export enum TypeEnum {
  Horizontal,
  Vertical,
  Dot,
}

export interface IDividerProps {
  theme?: ThemeInterface;
  type?: TypeEnum;
  bgColor?: ColorKey;
}
