import {ThemeInterface} from 'styled-components';

export interface IPostCardProps {
  theme?: ThemeInterface;
  date: Date;
  title: string;
  supportersClub: string;
  commentsCount: number;
  isFollowing: boolean;
}
