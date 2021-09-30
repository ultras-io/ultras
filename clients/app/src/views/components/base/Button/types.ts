import {IconNames} from 'assets/icons';

export enum Size {
  Small,
  Default,
  Big,
}

export enum Color {
  Default,
  Danger,
  Primary,
  Secondary,
}

export enum Appearance {
  Default,
  Minimal,
  Outline,
}

export enum IconPosition {
  Left,
  Right,
}

export interface IButtonProps {
  onPress: () => void;
  title?: string;
  size?: Size;
  color?: Color;
  appearance?: Appearance;
  icon?: IconNames;
  iconPosition?: IconPosition;
  isLoading?: boolean;
  isDisabled?: boolean;
}
