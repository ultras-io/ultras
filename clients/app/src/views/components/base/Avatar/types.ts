export enum SizeEnum {
  Small,
  Default,
  Big,
  ExtraBig,
}

export interface IAvatarProps {
  avatarUri?: string;
  size?: SizeEnum;
  isTeam?: boolean;
}
