import { RouteProp } from '@react-navigation/native';
import { TeamViewModel } from '@ultras/core-api-sdk';

export interface ITeamProps {
  route: RouteProp<{ params: { tabName: string; data: TeamViewModel } }, 'params'>;
}

export interface ITeamContainerProps {
  data: TeamViewModel;
}

export interface ITeamComponentProps {
  data: TeamViewModel;
  isFavorite: boolean;
  updateTeams: (teamId: number) => void;
}
