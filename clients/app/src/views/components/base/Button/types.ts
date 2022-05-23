import { ThemeInterface } from 'styled-components';
import { ColorKey } from 'themes/types';
import { IconNamesEnum } from 'assets/icons';

export enum SizeEnum {
  Small,
  Default,
  Big,
  ExtraBig,
}

export enum BoxSizeEnum {
  Contain,
  Cover,
}

export enum AppearanceEnum {
  Default,
  Minimal,
  UnderLined,
  Outline,
}

export enum IconPositionEnum {
  Left,
  Right,
}

export interface IButtonProps {
  theme?: ThemeInterface;
  onPress: () => void;
  title?: string;
  size?: SizeEnum;
  color?: ColorKey;
  bgColor?: ColorKey;
  boxSize?: BoxSizeEnum;
  appearance?: AppearanceEnum;
  icon?: IconNamesEnum;
  iconPosition?: IconPositionEnum;
  isLoading?: boolean;
  isDisabled?: boolean;
}
