import {ThemeInterface} from 'styled-components';

export enum TypeEnum {
  Horizontal,
  Vertical,
  Dot,
}

export interface IDividerProps {
  theme?: ThemeInterface;
  type?: TypeEnum;
}
