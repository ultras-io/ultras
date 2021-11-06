export enum SizeEnum {
  Small,
  Default,
  Big,
  ExtraBig,
}

export interface IAvatarProps {
  onPress?: () => void;
  avatarUri?: string;
  size?: SizeEnum;
  isTeam?: boolean;
}
