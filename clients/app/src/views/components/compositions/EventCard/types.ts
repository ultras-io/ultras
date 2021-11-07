import {ThemeInterface} from 'styled-components';

export interface IEventCardProps {
  theme?: ThemeInterface;
  image?: string;
  date: Date;
  title: string;
  location?: string;
  goingCount: number;
  commentsCount: number;
  creator: string;
  supportersClub?: string;
  isGoing: boolean;
  isLiked: boolean;
  onPress: () => void;
}

export type EventInfoProps = Omit<IEventCardProps, 'onPress'> & {
  likeCount: number;
};
