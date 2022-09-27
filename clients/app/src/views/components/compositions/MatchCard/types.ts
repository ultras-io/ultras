import { MatchViewModel } from '@ultras/view-models';

export type Score = {
  team1Score: number;
  team2Score: number;
  team1Penalties?: number;
  team2Penalties?: number;
};

export interface IMatchCardProps {
  onPress: () => void;
  data: MatchViewModel;
  inverted?: boolean;
}

export interface IMatchInfoProps {
  data: MatchViewModel;
  pressable?: boolean;
}

export interface ITeamInfoProps {
  onPress: () => void;
  logo: string;
  name: string;
}
