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

export interface IBadgeProps {
  number: number;
  size?: SizeEnum;
  color?: ColorEnum;
}

export interface IWithBadgeProps {
  children: React.ReactNode;
}
