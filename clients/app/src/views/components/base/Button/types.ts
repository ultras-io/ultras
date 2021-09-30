import {IconNamesEnum} from 'assets/icons';

export enum SizeEnum {
  Small,
  Default,
  Big,
}

export enum ColorEnum {
  Default,
  Danger,
  Primary,
  Secondary,
}

export enum AppearanceEnum {
  Default,
  Minimal,
  Outline,
}

export enum IconPositionEnum {
  Left,
  Right,
}

export interface IButtonProps {
  onPress: () => void;
  title?: string;
  size?: SizeEnum;
  color?: ColorEnum;
  appearance?: AppearanceEnum;
  icon?: IconNamesEnum;
  iconPosition?: IconPositionEnum;
  isLoading?: boolean;
  isDisabled?: boolean;
}
