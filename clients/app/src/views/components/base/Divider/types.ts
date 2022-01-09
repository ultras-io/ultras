import { ThemeInterface } from 'styled-components';
import { ColorKey } from 'themes/styled';

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
