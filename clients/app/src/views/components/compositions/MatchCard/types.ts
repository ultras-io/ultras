import { ThemeInterface } from 'styled-components';
import { MatchViewModel } from '@ultras/view-models';

export type Score = {
  team1Score: number;
  team2Score: number;
  team1Penalties?: number;
  team2Penalties?: number;
};

export interface IMatchCardProps {
  theme?: ThemeInterface;
  onPress: () => void;
  data: MatchViewModel;
  horizontal?: boolean;
}

export interface IMatchInfoProps {
  theme?: ThemeInterface;
  data: MatchViewModel;
}
