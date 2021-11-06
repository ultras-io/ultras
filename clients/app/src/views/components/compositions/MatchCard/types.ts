import {ThemeInterface} from 'styled-components';
import {IMatchTimeProps} from '../MatchTime';

export type Score = {
  team1Score: number;
  team2Score: number;
  team1Penalties?: number;
  team2Penalties?: number;
};

export interface IMatchCardProps {
  theme?: ThemeInterface;
  id: string;
  onPress: () => void;
  team1Name: string;
  team2Name: string;
  team1URI: string;
  team2URI: string;
  country?: string;
  league: string;
  score?: Score;
  horizontal?: boolean;
}

export type MatchInfoProps = Omit<IMatchCardProps, 'onPress' | 'horizontal'> &
  IMatchTimeProps & {venue: string};
