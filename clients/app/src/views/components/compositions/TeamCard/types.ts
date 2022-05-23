import { ThemeInterface } from 'styled-components';
import { TeamViewModel } from '@ultras/core-api-sdk';

export interface ITeamCardProps {
  theme?: ThemeInterface;
  data: TeamViewModel;
  onPress: () => void;
}
