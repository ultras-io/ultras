import {ThemeInterface} from 'styled-components';

export enum SideEnum {
  Left,
  Right,
}

export interface IMessageBoxProps {
  theme?: ThemeInterface;
  children: React.ReactNode;
  side?: SideEnum;
}
