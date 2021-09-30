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

export interface IBadgeProps {
  number: number;
  size?: Size;
  color?: Color;
}

export interface IWithBadgeProps {
  children: React.ReactNode;
}
