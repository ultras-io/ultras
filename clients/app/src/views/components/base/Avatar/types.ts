export enum Size {
  Small,
  Default,
  Big,
}

export interface IAvatarProps {
  uri: string;
  size?: Size;
}
