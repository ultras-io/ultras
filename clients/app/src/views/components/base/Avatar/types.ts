export enum SizeEnum {
  Small,
  Default,
  Big,
}

export interface IAvatarProps {
  uri: string;
  size?: SizeEnum;
}
