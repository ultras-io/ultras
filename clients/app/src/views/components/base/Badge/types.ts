import { ThemeInterface } from 'styled-components';
import { ColorKey } from 'themes/types';

export enum SizeEnum {
  Small,
  Default,
  Big,
}

export interface IBadgeProps {
  theme?: ThemeInterface;
  number: number;
  size?: SizeEnum;
  color?: ColorKey;
  bgColor?: ColorKey;
}

export interface IWithBadgeProps {
  children: React.ReactNode;
}
