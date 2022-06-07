export interface IProfileCardProps {
  avatarUri: string;
  name: string;
  username: string;
  appearence?: 'minimal' | undefined;
  onPress: () => void;
}
