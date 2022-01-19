import { ThemeInterface } from 'styled-components';

export interface IEventCardProps {
  theme?: ThemeInterface;
  imageUri?: string;
  date: Date;
  title: string;
  location?: string;
  goingCount: number;
  commentsCount: number;
  likeCount?: number;
  creator: string;
  supportersClub?: string;
  isGoing: boolean;
  isLiked: boolean;
  onPress: () => void;
}

export type EventInfoProps = Omit<IEventCardProps, 'onPress'>;
