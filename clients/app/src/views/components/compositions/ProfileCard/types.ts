export interface IProfileCardProps {
  avatar: string;
  name: string;
  username: string;
  appearance?: 'minimal' | undefined;
  onPress: () => void;
}
