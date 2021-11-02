export enum SizeEnum {
  Small,
  Default,
  Big,
}

export interface IAvatarProps {
  avatarUri?: string;
  size?: SizeEnum;
  isTeam?: boolean;
}
