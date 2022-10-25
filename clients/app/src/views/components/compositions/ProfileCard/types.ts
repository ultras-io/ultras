export interface IProfileCardProps {
  avatarUri: string;
  name: string;
  username: string;
  appearance?: 'minimal' | undefined;
  onPress: () => void;
}
